import { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { Consumer } from "../Interfaces/Consumer";
import { supabase } from "../supabaseClient";


const ConsumersForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Consumer) => {
    setLoading(true);
    const { error } = await supabase.from("consumer").insert([values]);

    if (error) {
      console.log("Error inserting: ", error); // Aquí se imprime el error completo para depuración
      message.error(`Error: ${error.message}`);
    } else {
      message.success("!Consumer added successfully!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Consumer" style={{ width: 400, margin: "20px auto" }}>
      <Form<Consumer> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter the name" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ type: "email", message: "Invalid email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item label="Phone" name="telephone">
          <Input placeholder="Phone" />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input placeholder="Address" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Consumer
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ConsumersForm;
