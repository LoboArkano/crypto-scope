import React from 'react';
import millify from 'millify';
import {
  Collapse, Row, Col, Typography, Avatar,
} from 'antd';
import HTMLReactParser from 'html-react-parser';
import Loader from './Loader';
import { useGetExchangesQuery } from '../services/cryptoApi';

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={8}>Exchanges</Col>
        <Col span={8}>24h Trade Volume</Col>
        <Col span={8}>Markets</Col>
      </Row>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Col span={8}>
                      <Text>
                        <strong>
                          {exchange.rank}
                          .
                        </strong>
                      </Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text><strong>{exchange.name}</strong></Text>
                    </Col>
                    <Col span={8}>
                      $
                      {millify(exchange['24hVolume'])}
                    </Col>
                    <Col span={8}>{millify(exchange.numberOfMarkets)}</Col>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || '')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
