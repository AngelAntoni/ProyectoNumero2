import React, { useState } from "react";
import { Form, Input, Button, message, Card, InputNumber, Tabs, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const { TabPane } = Tabs;

const Proyecto2 = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      console.log("Submitting values:", values); // Para depuración

      await supabase.from("client").insert([values.client]);
      await supabase.from("consumer").insert([values.consumer]);
      await supabase.from("details_sale").insert([values.details]);
      await supabase.from("products").insert([values.product]);
      await supabase.from("sales").insert([values.sale]);
      await supabase.from("tickets").insert([values.ticket]);

      message.success("All data submitted successfully!");
      navigate("/TicketFinal"); // Cambia '/nextPage' por la ruta deseada
    } catch (error: any) {
      console.error("Error details:", error); // Para depuración
      message.error(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  // Calcular subtotal en tiempo real
  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.details?.amount || changedValues.details?.unit_price) {
      const amount = allValues.details.amount || 0;
      const unitPrice = allValues.details.unit_price || 0;
      const subtotal = amount * unitPrice;
      form.setFieldsValue({ details: { subtotal } });
    }
  };

  return (
    <Card title="Combined Form" style={{ width: 500, margin: "20px auto" }}>
      <Form form={form} layout="vertical" onFinish={onFinish} onValuesChange={onValuesChange}>
        <Tabs defaultActiveKey="1">
          {/* Pestaña de Cliente */}
          <TabPane tab="Client" key="1">
            <Form.Item label="Name" name={["client", "name"]} rules={[{ required: true, message: "Please enter the name" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Lastname" name={["client", "lastname"]} rules={[{ required: true, message: "Please enter the lastname" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Age" name={["client", "age"]} rules={[{ required: true, message: "Please enter the age", type: "number" }]}>
              <InputNumber />
            </Form.Item>
            <Form.Item label="Email" name={["client", "email"]} rules={[{ required: true, message: "Please enter the email", type: "email" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Password" name={["client", "password"]} rules={[{ required: true, message: "Please enter the password" }]}>
              <Input.Password />
            </Form.Item>
          </TabPane>

          {/* Pestaña de Consumidor */}
          <TabPane tab="Consumer" key="2">
            <Form.Item label="Name" name={["consumer", "name"]} rules={[{ required: true, message: "Please enter the name" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Email" name={["consumer", "email"]} rules={[{ type: "email", message: "Please enter a valid email" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name={["consumer", "phone"]} rules={[{ pattern: /^[0-9+-]+$/, message: "Please enter a valid phone number" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Address" name={["consumer", "address"]} rules={[{ required: true, message: "Please enter the address" }]}>
              <Input.TextArea rows={3} />
            </Form.Item>
          </TabPane>

          {/* Pestaña de Detalles de Venta */}
          <TabPane tab="Sale Details" key="3">
            <Form.Item label="Amount" name={["details", "amount"]} rules={[{ required: true, message: "Please enter the amount" }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Unit Price" name={["details", "unit_price"]} rules={[{ required: true, message: "Please enter the unit price" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Subtotal" name={["details", "subtotal"]}>
              <InputNumber disabled style={{ width: "100%" }} />
            </Form.Item>
          </TabPane>

          {/* Pestaña de Producto */}
          <TabPane tab="Product" key="4">
            <Form.Item label="Product Name" name={["product", "product_name"]} rules={[{ required: true, message: "Please enter the product name" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Product Description" name={["product", "product_description"]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Product Price" name={["product", "product_price"]} rules={[{ required: true, message: "Please enter the product price" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Creation Date" name={["product", "created_at"]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Date of Removal" name={["product", "deleted_at"]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </TabPane>

          {/* Pestaña de Venta */}
          <TabPane tab="Sale" key="5">
            <Form.Item label="Client ID" name={["sale", "client_id"]} rules={[{ required: true, message: "Please enter the client ID" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Sale Date" name={["sale", "sale_date"]} rules={[{ required: true, message: "Please enter the sale date" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Total" name={["sale", "total"]} rules={[{ required: true, message: "Please enter the total" }]}>
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </TabPane>

          {/* Pestaña de Ticket */}
          <TabPane tab="Ticket" key="6">
            <Form.Item label="Sale ID" name={["ticket", "sale_id"]} rules={[{ required: true, message: "Please enter the sale ID" }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Issue Date" name={["ticket", "fecha_emision"]} rules={[{ required: true, message: "Please enter the issue date" }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Content" name={["ticket", "contenido"]} rules={[{ required: true, message: "Please enter the content" }]}>
              <Input.TextArea />
            </Form.Item>
          </TabPane>
        </Tabs>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Submit All
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Proyecto2;