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
    <Card title="Agregar Cliente" style={{ width: 400, margin: "20px auto" }}>
      <Form<Client> layout="vertical" onFinish={onFinish}>
        {/* Campo para el nombre */}
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: "Por favor ingresa el nombre" }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>

        {/* Campo para el apellido */}
        <Form.Item
          label="Apellido"
          name="lastname"
          rules={[{ required: true, message: "Por favor ingresa el apellido" }]}
        >
          <Input placeholder="Apellido" />
        </Form.Item>

        {/* Campo para la edad (opcional) */}
        <Form.Item label="Edad" name="age">
          <InputNumber placeholder="Edad" min={0} style={{ width: "100%" }} />
        </Form.Item>

        {/* Campo para el correo electrónico */}
        <Form.Item
          label="Correo electrónico"
          name="email"
          rules={[
            { required: true, message: "Por favor ingresa el correo" },
            { type: "email", message: "Correo no válido" },
          ]}
        >
          <Input placeholder="Correo electrónico" />
        </Form.Item>

        {/* Campo para la contraseña */}
        <Form.Item
          label="Contraseña"
          name="password"
          rules={[{ required: true, message: "Por favor ingresa la contraseña" }]}
        >
          <Input.Password placeholder="Contraseña" />
        </Form.Item>

        {/* Botón de envío */}
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Agregar Cliente
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ClientsForm;