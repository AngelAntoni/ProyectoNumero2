import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { supabase } from "../supabaseClient";
import { Product } from "../Interfaces/Products";

const ProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Product) => {
    setLoading(true);
    const { error } = await supabase.from("products").insert([values]);

    if (error) {
      console.log("Error inserting:", error); // Aquí se imprime el error completo para depuración
      message.error(`Error: ${error.message}`);
    } else {
      message.success("Product added successfully!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Product" style={{ width: 400, margin: "20px auto" }}>
      <Form<Product> layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="product_name"
          rules={[{ required: true, message: "Please enter the name of the product" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>

        <Form.Item label="Product Description" name="product_description">
          <Input.TextArea placeholder="Product Description" />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="product_price"
          rules={[{ required: true, message: "Please enter the price of the product" }]}
        >
          <Input type="number" placeholder="Product price" />
        </Form.Item>

        <Form.Item label="Creation Date" name="created_at">
          <Input type="date" placeholder="Creation date" />
        </Form.Item>

        <Form.Item label="Date of Removal" name="deleted_at">
          <Input type="date" placeholder="Deletion date (optional)" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProductForm;
