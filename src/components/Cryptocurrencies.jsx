import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {
  Card, Row, Col, Input,
} from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [crypto, setCrypto] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) => (
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    ));

    setCrypto(filteredData);
  }, [cryptosList, searchTerm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurency"
            onChange={(e) => { setSearchTerm(e.target.value); }}
          />
        </div>
      )}
      <Row gutter={[24, 24]} className="crypto-card-container">
        {crypto?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={(
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="Crypto Icon"
                  />
                )}
                hoverable
              >
                <p>
                  Price:
                  {' '}
                  {millify(currency.price)}
                </p>
                <p>
                  Market Cap:
                  {' '}
                  {millify(currency.marketCap)}
                </p>
                <p>
                  Daily Change:
                  {' '}
                  {millify(currency.change)}
                  %
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

Cryptocurrencies.propTypes = {
  simplified: PropTypes.bool,
};

Cryptocurrencies.defaultProps = {
  simplified: false,
};

export default Cryptocurrencies;
