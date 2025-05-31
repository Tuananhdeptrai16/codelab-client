import React, { useState } from "react";
import { AutoComplete, Input } from "antd";
import getCourseHoc from "../../HOC/getCourseHoc";
import AppItemSearchHome from "../AppItemSearchHome";

const AppSearch = (props) => {
  const { courses } = props;
  const [options, setOptions] = useState([]);
  const onSearch = (value) => {
    const keyword = value.trim().toLowerCase();
    if (keyword === "") {
      setOptions([]);
      return;
    }
    const filtered = courses
      .filter((item) => item.title.toLowerCase().includes(keyword))
      .map((item) => ({
        key: item._id,
        value: item.title,
        label : <AppItemSearchHome course={item}/>
      }));

    setOptions(filtered);
  };

  const onSelect = (value) => {
    console.log("Đã chọn khóa học:", value);
    // Có thể điều hướng hoặc xử lý khi người dùng chọn khóa học ở đây
  };

  return (
    <div className="search d-md-none">
      <AutoComplete
        options={options}
        onSelect={onSelect}
        onSearch={onSearch}
        style={{ width: "100%" }}
      >
        <Input.Search
          placeholder="Tìm kiếm khóa học ..."
          enterButton
          className="search__input"
        />
      </AutoComplete>
    </div>
  );
};

export default getCourseHoc(AppSearch);
