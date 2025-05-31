import { Modal, Button, Radio, Typography, Space, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import "./index.style.scss"; 
import useCallApi from "../../services/useCallAPi";
import API from "../../services/shared/api";
import instanceCore from "../../services/setUpAxios";
import { useAuthState } from "../../ProviderContext/AppAuthJWTContext.js";

const { Title, Text } = Typography;

const AppQuizModal = ({
  isModalOpen,
  setIsModalOpen,
  quizData
}) => {
  const { auth } = useAuthState();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null); // ✅ trạng thái kết quả đúng/sai
  useEffect(() => {
    if (quizData?.data?.is_completed === 1) {
      Modal.confirm({
        title: "Câu hỏi đã được hoàn thành",
        content: "Bạn có muốn làm lại câu hỏi này không?",
        okText: "Làm lại",
        cancelText: "Không",
        onOk: () => {
          // Cho phép làm lại
          setSelectedAnswer(null);
          setIsCorrect(null);
        },
        onCancel: () => {
          // Đóng modal chính
          setIsModalOpen(false);
        },
      });
    }
  }, [quizData]);
  const { send, loading } = useCallApi({
    callApi: (data) => instanceCore.post(API.API_CHECK_QUIZ, data),
    success: (data) => {
      if (data?.data === true) {
        setIsCorrect(true);
        message.success("🎉 Chính xác! Bạn đã chọn đúng.");
      } else {
        setIsCorrect(false);
        message.error("❌ Sai rồi. Thử lại nhé!");
      }
    },
    error: (err) => {
      message.error("Lỗi khi gửi câu trả lời.");
    },
  });

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedAnswer(null);
    setIsCorrect(null); // Reset kết quả khi đóng
  };

  const handleChange = (e) => {
    setSelectedAnswer(e.target.value);
  };

  const handleSubmit = () => {
    send({
      studentId: auth?.user?.id,
      questionId: quizData?.data?.id,
      selectedAnswer: selectedAnswer
    });
  };

  const isLoading = !quizData || !quizData?.data?.options;

  return (
    <Modal
      title={<Title level={3}>🧠 Câu hỏi trắc nghiệm</Title>}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Đóng
        </Button>,
        !isCorrect && (
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            disabled={!selectedAnswer}
          >
            Hoàn thành
          </Button>
        ),
      ]}
      width={600}
    >
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <div className="modal-quiz-wrap">
          <Title level={4} style={{ marginBottom: 20, color: 'red' }}>
            {quizData?.data?.question}
          </Title>

          <Radio.Group
            onChange={handleChange}
            value={selectedAnswer}
            style={{ width: "100%" }}
            disabled={isCorrect !== null} // ✅ khóa chọn sau khi trả lời
          >
            <Space direction="vertical" className="w-full" size="large">
              {Object.entries(quizData.data.options).map(([key, value]) => (
                <Radio.Button
                  key={key}
                  value={key}
                  className="custom-radio-button"
                >
                  <Text strong>{key}. </Text> {value}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>

          {isCorrect === true && (
            <Text type="success" style={{ marginTop: 20, display: "block" }}>
              ✅ Bạn đã trả lời đúng!
            </Text>
          )}
          {isCorrect === false && (
            <Text type="danger" style={{ marginTop: 20, display: "block" }}>
              ❌ Câu trả lời chưa chính xác.
            </Text>
          )}
        </div>
      )}
    </Modal>
  );
};

export default AppQuizModal;
