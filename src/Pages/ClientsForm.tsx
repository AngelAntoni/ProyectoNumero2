import React, { useState } from "react";
import { Form, Input, Button, message, Card, InputNumber } from "antd";
import { Client } from "../Interfaces/Client";
import { supabase } from "../supabaseClient";
//Formulario Clientes
const ClientsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Client) => {
    setLoading(true);

    // Insertar el nuevo cliente en la base de datos
    const { error } = await supabase.from("client").insert([values]);

    if (error) {
      message.error(`Error: ${error.message}`);
    } else {
      message.success("¡Cliente agregado con éxito!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Client" style={{ width: 400, margin: "20px auto" }}>
      <Form<Client> layout="vertical" onFinish={onFinish}>
        {/* Campo para el nombre */}
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        {/* Campo para el apellido */}
        <Form.Item
          label="Lastname"
          name="lastname"
          rules={[{ required: true, message: "Please enter the last name" }]}
        >
          <Input placeholder="Lastname" />
        </Form.Item>

        {/* Campo para la edad (opcional) */}
        <Form.Item label="Age" name="age">
          <InputNumber placeholder="Age" min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Campo para el correo electrónico */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        {/* Campo para la contraseña */}
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>

        {/* Botón de envío */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Client
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ClientsForm;