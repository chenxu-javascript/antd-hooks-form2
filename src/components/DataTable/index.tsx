import React, { Fragment } from "react";
import Search from "./Search";
import Table from "./Table";
import { IProps } from "./interface";

const DataTable: React.FC<IProps> = props => {
  const {
    conditions,
    defaultValues,
    onSearch,
    columns,
    data,
    show_more_btn
  } = props;
  return (
    <Fragment>
      <Search
        conditions={conditions}
        defaultValues={defaultValues}
        onSearch={onSearch}
        show_more_btn={show_more_btn}
      />
      <Table columns={columns} dataSource={data} />
    </Fragment>
  );
};

export default DataTable;
