import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Table, Space } from "antd";
import { DeleteOutlined, UnlockOutlined } from "@ant-design/icons";

import { IS_LOGIN_LOCAL_STORAGE } from "../../constants";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Registration date",
    dataIndex: "registration",
  },
  {
    title: "Last login date",
    dataIndex: "login",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const UsersPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const loadUsers = async () => {
    const response = await axios.get(
      "https://fathomless-headland-55323.herokuapp.com/api/get"
    );
    setUsers(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const logOut = () => {
    localStorage.setItem(IS_LOGIN_LOCAL_STORAGE, "{}");
    navigate("/");
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const deleteUser = (id) => {
    id.forEach((element) => {
      axios.delete(
        `https://fathomless-headland-55323.herokuapp.com/api/remove/${element}`
      );
    });
    window.location.reload();
  };

  const unblockedUser = (id) => {
    id.forEach((element) => {
      axios.put(
        `https://fathomless-headland-55323.herokuapp.com/api/update/${element}`,
        {
          status: "active",
        }
      );
    });
    loadUsers();
  };

  const blockedUser = (id) => {
    id.forEach((element) => {
      axios.put(
        `https://fathomless-headland-55323.herokuapp.com/api/update/${element}`,
        {
          status: "blocked",
        }
      );
    });

    window.location.reload();
  };

  return (
    <div style={{ padding: "30px" }}>
      <div style={{ textAlign: "end" }}>
        <Button onClick={logOut}>Выйти</Button>
      </div>
      <h1 style={{ padding: "15px" }}>Users list</h1>
      <div style={{ textAlign: "start" }}>
        <Space size="small">
          <Button onClick={() => blockedUser(selectedRowKeys)}>
            Block user
          </Button>
          <UnlockOutlined
            onClick={() => unblockedUser(selectedRowKeys)}
            style={{ fontSize: "20px" }}
          />
          <DeleteOutlined
            onClick={() => deleteUser(selectedRowKeys)}
            style={{ fontSize: "20px" }}
          />
        </Space>
      </div>

      <div>
        <div
          style={{
            marginBottom: 25,
          }}
        ></div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={users.map((user) => ({ ...user, key: user.id }))}
        />
      </div>
    </div>
  );
};

export default UsersPage;
