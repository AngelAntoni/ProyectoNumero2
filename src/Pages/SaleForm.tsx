import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { Sale } from "../Interfaces/Sale"; // Importa la interfaz Sale
import { supabase } from "../supabaseClient";

const SaleForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Sale) => {
    setLoading(true);
    const { error } = await supabase.from("sales").insert([values]);

    if (error) {
      console.log("Error inserting:", error); // Aquí se imprime el error completo para depuración
      message.error(`Error: ${error.message}`);
    } else {
      message.success("¡Sale added successfully!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Sale" style={{ width: 400, margin: "20px auto" }}>
      <Form<Sale> layout="vertical" onFinish={onFinish}>
        <Form.Item label="Client ID" name="client_id">
          <Input placeholder="Client ID" />
        </Form.Item>

        <Form.Item label="Sale Date" name="sale_date">
          <Input type="date" placeholder="Sale Date" />
        </Form.Item>

        <Form.Item
          label="Total Sale"
          name="total"
          rules={[{ required: true, message: "Please enter the total sale amount" }]}
        >
          <Input type="number" placeholder="Total sale" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Sale
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SaleForm;
