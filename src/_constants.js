const constants = {
  "defaultPair": "BTCUSD",
  "url"  : {
    'Get_Ticker': 'https://api.bitfinex.com/v1/pubticker/',
    'Get_Trades': 'https://api.bitfinex.com/v1/trades/',
    'Websocket': 'wss://api.bitfinex.com/ws'
  },
  "list" : [
    {
      name    : 'BTC',
      currency: 'EUR'
    },
    {
      name    : 'BTC',
      currency: 'USD'
    },
    {
      name    : 'ETH',
      currency: 'USD'
    },
    {
      name    : 'ETH',
      currency: 'BTC'
    },
    {
      name    : 'XRP',
      currency: 'USD'
    },
    {
      name    : 'XRP',
      currency: 'BTC'
    },
    {
      name    : 'EOS',
      currency: 'USD'
    },
    {
      name    : 'EOS',
      currency: 'BTC'
    },
    {
      name    : 'EOS',
      currency: 'ETH'
    }
  ]
}

export default constants
