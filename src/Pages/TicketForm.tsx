import React, { useState } from "react";
import { Form, Input, Button, message, Card } from "antd";
import { Ticket } from "../Interfaces/Ticket"; // Import the Ticket interface
import { supabase } from "../supabaseClient";

const TicketForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: Ticket) => {
    setLoading(true);
    const { error } = await supabase.from("tickets").insert([values]);

    if (error) {
      console.log("Error inserting:", error); // Logs the full error for debugging
      message.error(`Error: ${error.message}`);
    } else {
      message.success("Ticket added successfully!");
    }

    setLoading(false);
  };

  return (
    <Card title="Add Ticket" style={{ width: 400, margin: "20px auto" }}>
      <Form<Ticket> layout="vertical" onFinish={onFinish}>
        <Form.Item label="Sale ID" name="sale_id">
          <Input placeholder="Sale ID" />
        </Form.Item>

        <Form.Item label="Issue Date" name="fecha_emision">
          <Input type="date" placeholder="Issue Date" />
        </Form.Item>

        <Form.Item label="Content" name="contenido">
          <Input.TextArea placeholder="Ticket content" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Add Ticket
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TicketForm;
