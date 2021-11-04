import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 2) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fiil: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName}
          {' '}
          Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}
            %
          </Title>
          <Title level={5} className="current-price">
            Current
            {' '}
            {coinName}
            {' $'}
            {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

LineChart.propTypes = {
  coinHistory: PropTypes.shape({
    data: PropTypes.shape({
      history: PropTypes.arrayOf.isRequired,
      change: PropTypes.number.isRequired,
    }).isRequired,
  }),
  currentPrice: PropTypes.string.isRequired,
  coinName: PropTypes.string.isRequired,
};

LineChart.defaultProps = {
  coinHistory: undefined,
};

export default LineChart;
