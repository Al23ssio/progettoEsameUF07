import type { Coin, CoinDetail, HistoricalData, TimeRange } from '../types';

/**
 * funzione seeded random per generare valori consistenti
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Genera mock data per 250 criptovalute
 */
function generateMockCoins(): Coin[] {
  const topCoins = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', price: 97234.56, marketCap: 1923456789012 },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', price: 3456.78, marketCap: 415678901234 },
    { id: 'tether', symbol: 'usdt', name: 'Tether', image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png', price: 1.00, marketCap: 95678901234 },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', price: 612.34, marketCap: 89456789012 },
    { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', price: 234.56, marketCap: 78901234567 },
    { id: 'ripple', symbol: 'xrp', name: 'XRP', image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', price: 0.54, marketCap: 29567890123 },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', price: 0.87, marketCap: 30678901234 },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', price: 0.12, marketCap: 17234567890 },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', price: 23.45, marketCap: 28901234567 },
    { id: 'polygon', symbol: 'matic', name: 'Polygon', image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png', price: 1.23, marketCap: 11234567890 },
  ];

  const coins: Coin[] = [];

  // Aggiungi le top 10 coin reali
  topCoins.forEach((coin, index) => {
    const seed = coin.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const changePercent = (seededRandom(seed * 100) - 0.5) * 10;
    
    coins.push({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      current_price: coin.price,
      market_cap: coin.marketCap,
      market_cap_rank: index + 1,
      price_change_percentage_24h: changePercent,
      isFavorite: false,
    });
  });

  // Genera altre 240 coin mock per arrivare a 250
  const coinNames = [
    'Avalanche', 'Chainlink', 'Shiba Inu', 'Litecoin', 'Cosmos', 'Uniswap', 'Stellar', 'Monero', 'Algorand', 'Bitcoin Cash',
    'Tron', 'Ethereum Classic', 'VeChain', 'Filecoin', 'Internet Computer', 'Hedera', 'ApeCoin', 'Sandbox', 'Decentraland', 'Axie Infinity',
    'Tezos', 'EOS', 'Aave', 'Maker', 'Neo', 'Fantom', 'Elrond', 'Theta', 'Flow', 'Zcash',
    'Kusama', 'Dash', 'Compound', 'Curve', 'Synthetix', 'Yearn Finance', 'Sushi', '1inch', 'Enjin', 'Chiliz',
    'Basic Attention', 'Loopring', 'Zilliqa', 'Waves', 'OMG Network', 'Qtum', 'ICON', 'Ravencoin', 'Nano', 'Decred',
    'Horizen', 'Ontology', 'Holo', 'Verge', 'Digibyte', 'Steem', 'Status', 'Augur', 'Civic', 'Storj',
    'Golem', 'iExec', 'Gnosis', 'Bancor', 'Numeraire', 'Request', 'Kyber', 'Polymath', 'Power Ledger', 'Aragon',
    'District0x', 'FunFair', 'Metal', 'Raiden', 'SingularityNET', 'Origin', 'Ocean Protocol', 'Fetch AI', 'Ankr', 'Celer',
    'Matic Network', 'Harmony', 'Kava', 'Band Protocol', 'Ren', 'Orchid', 'Balancer', 'UMA', 'Serum', 'Swipe',
    'Celsius', 'Nexo', 'Crypto.com', 'Enjin Coin', 'Wax', 'Energi', 'Divi', 'Helium', 'Terra', 'Celo',
    'Secret', 'Chia', 'NEAR Protocol', 'Oasis', 'Injective', 'Thorchain', 'Bluzelle', 'Reserve', 'Alpha Finance', 'Wing',
    'Perpetual Protocol', 'Dodo', 'Bao Finance', 'Harvest', 'Cream Finance', 'Keep Network', 'NuCypher', 'Badger DAO', 'Rari Capital', 'Reflexer',
    'Alchemix', 'Fei Protocol', 'Olympus', 'Abracadabra', 'Convex', 'Ribbon Finance', 'Euler', 'Maple Finance', 'TrueFi', 'Goldfinch',
    'Liquity', 'Frax', 'Tribe', 'Rally', 'Audius', 'Mirror', 'SuperRare', 'Foundation', 'Rarible', 'Zora',
    'Nifty Gateway', 'OpenSea', 'LooksRare', 'X2Y2', 'Blur', 'Magic Eden', 'Immutable X', 'Gods Unchained', 'Illuvium', 'Star Atlas',
    'Gala Games', 'Enjin Games', 'Ultra', 'WAX Games', 'Vulcan Forged', 'Mobox', 'Radio Caca', 'Merit Circle', 'Yield Guild', 'BlackPool',
    'Aavegotchi', 'Alien Worlds', 'Splinterlands', 'My Neighbor Alice', 'Star Sharks', 'CryptoBlades', 'Faraland', 'Legends of Elumia', 'Block Lords', 'Undead Blocks',
    'Meta Apes', 'Hunters On-Chain', 'Benji Bananas', 'Genopets', 'Stepn', 'Sweatcoin', 'Walken', 'Dotmoovs', 'OliveX', 'Calo',
    'Step App', 'Wirtual', 'Defit', 'Fitmint', 'Dustland', 'ByBit Token', 'OKB', 'KuCoin Token', 'Gate Token', 'Huobi Token',
    'FTX Token', 'BitMart Token', 'MEXC Token', 'Bitget Token', 'Phemex Token', 'WOO Network', 'DYDX', 'GMX', 'Gains Network', 'Vertex',
    'Kwenta', 'Lyra', 'Dopex', 'Premia', 'Hegic', 'Ribbon', 'Friktion', 'Katana', 'Drift Protocol', 'Mango Markets',
    'Zeta Markets', 'Pyth Network', 'Chainlink Oracles', 'Band Oracles', 'DIA Data', 'API3', 'Tellor', 'Umbrella', 'Razor Network', 'Witnet',
    'SupraOracles', 'RedStone', 'Flux Protocol', 'Chronicle', 'Stork Oracle', 'Switchboard', 'Entropy', 'Acurast', 'Flare Network', 'Gelato',
  ];

  for (let i = 0; i < 240; i++) {
    const rank = i + 11; // Inizia dal rank 11
    const nameSeed = i * 17 + 42;
    const name = coinNames[i] || `Crypto Coin ${i + 11}`;
    const symbol = name.toLowerCase().replace(/\s+/g, '').slice(0, 4) + (i % 10);
    const id = name.toLowerCase().replace(/\s+/g, '-');
    
    // Genera prezzi e market cap decrescenti basati sul rank
    const basePrice = 1000 / Math.pow(rank / 10, 1.5);
    const priceVariance = (seededRandom(nameSeed) - 0.5) * basePrice * 0.3;
    const price = Math.max(0.0001, basePrice + priceVariance);
    
    const baseMarketCap = 50000000000 / Math.pow(rank / 10, 1.3);
    const marketCapVariance = (seededRandom(nameSeed + 100) - 0.5) * baseMarketCap * 0.3;
    const marketCap = Math.max(1000000, baseMarketCap + marketCapVariance);
    
    const changePercent = (seededRandom(nameSeed + 200) - 0.5) * 15;
    
    coins.push({
      id,
      symbol,
      name,
      image: `https://assets.coingecko.com/coins/images/${rank}/large/coin.png`,
      current_price: price,
      market_cap: marketCap,
      market_cap_rank: rank,
      price_change_percentage_24h: changePercent,
      isFavorite: false,
    });
  }

  return coins;
}

const MOCK_COINS: Coin[] = generateMockCoins();

// genera dettagli mock per una coin specifica
export function generateMockCoinDetail(id: string): CoinDetail {
  // Cerca prima nei mock coins esistenti
  let coin = MOCK_COINS.find(c => c.id === id);
  
  // Se non trovata, genera dati dinamici per questa coin invece di usare Bitcoin
  if (!coin) {
    const seed = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const price = Math.max(0.01, seededRandom(seed * 123) * 1000);
    const marketCap = price * seededRandom(seed * 456) * 1000000000;
    const changePercent = (seededRandom(seed * 789) - 0.5) * 10;
    
    coin = {
      id: id,
      symbol: id.slice(0, 4).toUpperCase(),
      name: id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, ' '),
      image: `https://assets.coingecko.com/coins/images/1/large/${id}.png`,
      current_price: price,
      market_cap: marketCap,
      market_cap_rank: 999,
      price_change_percentage_24h: changePercent,
      isFavorite: false,
    };
  }
  
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    description: {
      en: `${coin.name} è una criptovaluta inesistente utilizzata come test per il progetto CryptoMAT.`,
    },
    image: {
      large: coin.image,
    },
    market_data: {
      current_price: {
        usd: coin.current_price,
      },
      market_cap: {
        usd: coin.market_cap,
      },
      market_cap_rank: coin.market_cap_rank,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      high_24h: {
        usd: coin.current_price * 1.05,
      },
      low_24h: {
        usd: coin.current_price * 0.95,
      },
      circulating_supply: coin.market_cap / coin.current_price,
      total_supply: (coin.market_cap / coin.current_price) * 1.1,
    },
  };
}

// genera dati storici mock per una coin specifica e range di tempo
export function generateHistoricalData(coinId: string, range: TimeRange): HistoricalData[] {
  // Cerca prima nei mock coins esistenti
  let coin = MOCK_COINS.find(c => c.id === coinId);
  
  // Se non trovata, genera dati dinamici
  let basePrice: number;
  if (!coin) {
    const seed = coinId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    basePrice = Math.max(0.01, seededRandom(seed * 123) * 1000);
  } else {
    basePrice = coin.current_price;
  }
  
  const data: HistoricalData[] = [];
  const now = Date.now();
  
  // seed base univoco per coin
  const baseSeed = coinId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  if (range === 'daily') {
    // giornaliero: ultime 24 h
    for (let i = 23; i >= 0; i--) {
      const timestamp = now - (i * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const hour = date.getHours();
      const label = `${hour.toString().padStart(2, '0')}:00`;
      
      // SEED FISSO: basato su coinId + ora specifica
      const fixedSeed = baseSeed * 1000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.01;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  } else if (range === 'weekly') {
    // settimanale: ultimi 7 giorni
    for (let i = 6; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // SEED FISSO: basato su coinId + giorno specifico
      const fixedSeed = baseSeed * 2000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.06;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  } else if (range === 'monthly') {
    // mensile: ultimi 30 gionri
    for (let i = 29; i >= 0; i--) {
      const timestamp = now - (i * 24 * 60 * 60 * 1000);
      const date = new Date(timestamp);
      const label = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
      
      // SEED FISSO: basato su coinId + giorno specifico
      const fixedSeed = baseSeed * 3000 + i;
      const randomValue = seededRandom(fixedSeed);
      
      const variance = (randomValue - 0.5) * 0.16;
      const price = basePrice * (1 + variance);
      
      data.push({
        timestamp: label,
        price: i === 0 ? basePrice : price,
      });
    }
  }

  return data;
}

// esporta i mock data
export { MOCK_COINS };