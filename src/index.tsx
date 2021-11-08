import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs'
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelance web',
          type: 'deposit',
          category: 'Dev',
          amount: '7000',
          createdAt: new Date ('2021-11-07 09:00:00'),
        },
        {
          id: 2,
          title: 'Arrendamento',
          type: 'withdraw',
          category: 'Casa',
          amount: '300',
          createdAt: new Date ('2021-11-01 11:00:00'),
        },
      ],
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);