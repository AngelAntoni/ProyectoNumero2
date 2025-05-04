import React, { useState } from "react";
import { Form, Input, Button, message, Card, InputNumber } from "antd";
import { Client } from "../Interfaces/Client";
import { supabase } from "../supabaseClient";
import { Link, useNavigate } from "react-router-dom";

// Formulario Clientes
const ClientsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm<Client>();  
  const navigate = useNavigate();

  // Check if email already exists
  const checkEmailExists = async (email: string) => {
    const { data, error } = await supabase
      .from("client")
      .select("email")
      .eq("email", email)
      .single();
    
    return !!data; // Return true if data exists (email found)
  };

  const onFinish = async (values: Client) => {
    setLoading(true);

    try {
      // First check if email already exists
      const emailExists = await checkEmailExists(values.email);
      
      if (emailExists) {
        message.error("This email is already registered. Please use a different email.");
        setLoading(false);
        return;
      }

      // Proceed with insertion if email doesn't exist
      const { error } = await supabase.from("client").insert([values]);

      if (error) {
        // Handle other possible errors
        message.error(`Error: ${error.message}`);
      } else {
        message.success("¡Cliente agregado con éxito!");
        form.resetFields(); // Clear form after successful submission
        
        // Redireccionar a la página deseada después de guardar exitosamente
        navigate("/123"); // Cambia esto a la ruta a la que quieres navegar
      }
    } catch (err) {
      message.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    try {
      await form.validateFields(); // Valida todos los campos
      navigate("/123");    // Si no hay errores, navega
    } catch (error) {
      message.warning("Por favor completa todos los campos requeridos");
    }
  };

  return (
    <Card title="Add Client" style={{ width: 400, margin: "20px auto" }}>
      <Form<Client> form={form} layout="vertical" onFinish={onFinish}>
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

        <Form.Item>
          <Link to="/collections">
            <Button type="primary" block>
              Base de Datos (temporal)
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ClientsForm;