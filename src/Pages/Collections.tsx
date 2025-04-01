import React from "react";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { Space } from "antd";
import Title from "antd/es/typography/Title";

const App: React.FC = () => (
  
<div style={{
    position: 'absolute',
    top: '40%',
    left: '40%',
    transform: 'translate(-50%, -50%)',
  }}>
    <Title level={2} style={{color: "white", marginBottom: "20px",  }}>
    🛢  DATABASE TABLES
    </Title>
    {
    <Space align="center">
    <Row justify="center" gutter={25} style={{ maxWidth: "900px", margin: "0 auto" }}>
    <Col span={8}>
      <Link to="/ClientBD">
        <Card title=" 👤 Clients" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>
    <Col span={8
      
    }>
      <Link to="/ConsumerBD">
        <Card title="👤🛒Consumer" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>
    <Col span={8}>
      <Link to="/DetailsDB">
        <Card title="📝 Details" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>

    <Col span={24} style={{ textAlign: "right", margin: "20px 0" }}>
      <div style={{ height: "2px", backgroundColor: "##000100", width: "100%" }}></div>
    </Col>

    <Col span={8}>
      <Link to="/ProductDB">
        <Card title="📦 Products" variant="borderless">
         Press me
        </Card>
      </Link>
    </Col>
    <Col span={8}>
      <Link to="/SaleBD">
        <Card title="🏷️ Sale" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>
    <Col span={8}>
      <Link to="/TicketBD">
        <Card title="📑 Ticket" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>
    <Col span={8}>
      <Link to="/123">
        <Card title="Solicitud De Relleno" variant="borderless">
          Press me
        </Card>
      </Link>
    </Col>

    

  </Row>
  </Space>
  }

</div>
);


export default App;
