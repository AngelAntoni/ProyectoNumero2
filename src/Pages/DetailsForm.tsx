import React, { useState } from "react";
import { Form, Input, InputNumber, Button, message, Card } from "antd";
import { supabase } from "../supabaseClient";

// Interfaz para el formulario de venta
export interface DetailsSale {
  id: string; // UUID generado automáticamente
  sale_id?: string | null; // Puede ser nulo, por eso es opcional
  product_id?: string | null; // Puede ser nulo, por eso es opcional
  amount: number;
  unit_price: number;
  subtotal: number;
}

const DetailsForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: DetailsSale) => {
    setLoading(true);

    // Calcular subtotal automáticamente
    const subtotal = values.amount * values.unit_price;
    const saleData = { ...values, subtotal };

    const { error } = await supabase.from("details_sale").insert([saleData]);

    if (error) {
      console.log("Error inserting:", error);
      message.error(`Error: ${error.message}`);
    } else {
      message.success("¡Sale added successfully!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Sale" style={{ width: 400, margin: "20px auto" }}>
      <Form<DetailsSale> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Sale ID"
          name="sale_id"
          rules={[{ required: false }]} // Opcional
        >
          <Input placeholder="Sales ID (optional)" />
        </Form.Item>

        <Form.Item
          label="Product ID"
          name="product_id"
          rules={[{ required: false }]} // Opcional
        >
          <Input placeholder="Product ID (optional)" />
        </Form.Item>

        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please enter the amount" }]}
        >
          <InputNumber min={1} placeholder="Amount" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Unit Price"
          name="unit_price"
          rules={[{ required: true, message: "Please enter the unit price" }]}
        >
          <InputNumber min={0} placeholder="Unit price" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Subtotal" name="subtotal">
          <InputNumber disabled value={0} style={{ width: "100%" }} />
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

export default DetailsForm;
