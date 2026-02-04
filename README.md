!!!IMPORTANTE!!!
----------------
Nota sulle performance API: CryptoMAT si appoggia al piano pubblico gratuito delle API di CoinGecko. A causa dei limiti di rate-limit imposti dal provider (poche richieste al minuto), si potrebbero notare dei rallentamenti nell'aggiornamento dei dati real-time o la visualizzazione di dati 'mock' (simulati) quando si passa rapidamente da una criptovaluta all'altra.

Questo comportamento è "intenzionale": l'applicazione è progettata per gestire il rate-limit attivando automaticamente un fallback sui dati mock e mantenendo in cache le coin già visitate per garantire la stabilità della UI senza generare errori.
Ho provato anche con l'aiuto dell'IA ad ottimizzare il più possibile (ad esempio anzichè fare 5 chiamate API una per ogni pagina ne viene fatta 1 per tutte e 250 le coin ma comunque il problema persiste).
----------------

ERRORI COMUNI:
- CERTI CARATTERI SE USATI A INIZIO PAROLA NEL FILTRO DI RICERCA IN BASE AL NOME DELLA COIN FANNO CRASHARE TUTTO.
- SE SI SPAMMA E SI VISUALIZZANO DIVERSE COIN IN POCO TEMPO LE CHIAMATE FINISCONO E OGNI TANTO I DATI MOCK NON HANNO SENSO (NON CAPISCO PERCHE') (AD ESEMPIO SHIBA INU MOSTRA PREZZI STRANI SE VISUALIZZATA IMMEDIATAMENTE DOPO ALTRE COIN E DICE INOLTRE CHE LA CRIPTOVALUTA UTILIZZATA NON E' QUELLA CHE SI STA ANALIZZANDO)

[CREDO(CREDO{CREDO[SPERO]}) CHE TUTTI I PROBLEMI SIANO RIGUARDANTI AL LIMITE CHE IMPONE COINGECKO QUANDO SI USA L'API GRATUITA, PERCHE' SE SI ASPETTA QUALCHE MINUTO E SI REFRESHA LA PAGINA POI LA PRIMA SICURAMENTE MA FORSE ANCHE QUALCHE COIN DOPO VA DA DIO, CON TANTO DI DESCRIZIONE E GRAFICI CON I PREZZI PERFETTI]


# CryptoMAT

Un applicazione web per monitorare i prezzi delle criptovalute in tempo reale. Il progetto usa l'API di CoinGecko per recuperare i dati di mercato e mostrare informazioni dettagliate su centinaia di crypto.

## Scopo del progetto

Single Page Application (SPA) sviluppata per l'esame di Programmazione WEB UF07. L'applicazione funge da terminale di monitoraggio per il mercato delle criptovalute, interfacciandosi in tempo reale con le API di CoinGecko per fornire dati accurati e precisi su 250 asset digitali. Il progetto dimostra competenze in sviluppo React/TypeScript, gestione stato asincrono, routing client-side e visualizzazione dati.

## Funzionalità completate

- **Market Explorer**: visualizza le top 250 criptovalute suddivise in 5 pagine da 50 asset ciascuna con prezzi aggiornati, market cap e variazioni 24h
- **Deep Analysis**: pagina di dettaglio per ogni singolo asset con dati storici, tecnici e grafici interattivi
- **Ricerca dinamica**: barra di ricerca per trovare velocemente le crypto per nome o simbolo con filtro real-time
- **Ordinamento avanzato**: possibilità di ordinare per market cap, prezzo, nome o variazione percentuale
- **Grafici interattivi**: visualizzazione dello storico prezzi con filtri temporali (giornaliero, settimanale, mensile)
- **Design responsive**: interfaccia ottimizzata per desktop e mobile
- **Gestione errori**: fallback automatico a dati mock in caso di rate-limit API con sistema di caching

## Tecnologie utilizzate

- **React** con TypeScript per l'interfaccia
- **React Router** per la navigazione tra pagine
- **TanStack Query** per gestione delle chiamate API e caching
- **Recharts** per visualizazzione grafici
- **Vite** come build tool
- **CoinGecko API** per dati reali delle criptovalute

## API utilizzata

**CoinGecko Public API v3** (piano gratuito)
- **Endpoint base**: `https://api.coingecko.com/api/v3/`
- **Autenticazione**: nessuna (API pubblica, no credenziali richieste)
- **Dati forniti**: prezzi real-time, market cap, volumi, variazioni 24h, storico prezzi
- **Rate limit**: circa 10-50 chiamate/minuto (varia dinamicamente)
- **Documentazione**: https://www.coingecko.com/api/documentation

### Credenziali e dati mock

- **Nessuna credenziale richiesta**: l'API è completamente pubblica
- **Fallback automatico**: quando si supera il rate-limit, l'app passa automaticamente a dati mock generati localmente
- **Mock deterministici**: i dati mock usano seed fissi per garantire consistenza tra sessioni
- **Caching intelligente**: le coin già visitate vengono mantenute in cache per ridurre le chiamate API

## Come funziona

L'applicazione fa richieste all'API pubblica di CoinGecko per ottenere i dati. Se l'API non risponde o raggiunge il limite di rate (cosa che capita spesso con API gratuita), l'app passa automaticamente a utilizzare dati mock generati localmente. Questo permette di testare l'applicazione anche senza connessione o quando API non disponibile.

I dati mock sono generati con seed deterministici quindi sono consistenti tra ricaricamenti diversi della pagina.

## Installazione ed esecuzione

### Prerequisiti

- **Node.js** versione 18 o superiore
- **npm** (incluso con Node.js) o **yarn**
- Browser web moderno (Chrome, Firefox, Safari, Edge)

### Istruzioni passo-passo

1. **Clona il repository**:
```bash
git clone <url-repository>
cd progettoEsameUF07/CryptoMAT
```

2. **Installa le dipendenze**:
```bash
npm install
```

3. **Avvia il server di sviluppo**:
```bash
npm run dev
```

4. **Apri l'applicazione**: Naviga su `http://localhost:5173` nel browser

## Struttura progetto

- `src/components/` - componenti riutilizzabili (Loading, ErrorMessage)
- `src/hooks/` - custom hooks per gestire chiamate API
- `src/services/` - funzioni per chiamate API
- `src/types/` - definizioni TypeScript
- `src/utils/` - funzioni helper e generazione mock data
- `src/pages/` - pagine dell'applicazione

## Note

Il progetto è stato creato come esercizio per il corso, quindi alcune funzionalità tipo i preferiti sono solo simulate e non persistono i dati.

L'API di CoinGecko ha limiti di rate quindi se vedete l'avviso "dati mock" è normale, basta attendere un po prima di ricaricare.
CryptoMAT è una Single Page Application (SPA) sviluppata per l'esame di Programmazione WEB UF07. L'applicazione funge da terminale di monitoraggio per il mercato delle criptovalute, interfacciandosi in tempo reale con le API di CoinGecko per fornire dati accurati e precisii su 250 asset.
Le caratteristiche principali sono: - Market Explorer: visualizzazione delle top 250 crypto suddivise in 5 pagine da 50 asset ciascuna;
                                    - Deep Analysis: pagina di dettaglio per ogni singolo asset con dati storici e tecnici.
                                    - Grafici Interattivi: Visualizzazione dell'andamento dei prezzi tramite grafici dinamici modellabili/modificabili tramite vari filtri temporali.
