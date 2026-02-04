!!!IMPORTANTE!!!
----------------
Nota sulle performance API: CryptoMAT si appoggia al piano pubblico gratuito delle API di CoinGecko. A causa dei limiti di rate-limit imposti dal provider (poche richieste al minuto), si potrebbero notare dei rallentamenti nell'aggiornamento dei dati real-time o la visualizzazione di dati 'mock' (simulati) quando si passa rapidamente da una criptovaluta all'altra.

Questo comportamento è "intenzionale": l'applicazione è progettata per gestire il rate-limit attivando automaticamente un fallback sui dati mock e mantenendo in cache le coin già visitate per garantire la stabilità della UI senza generare errori.
Ho provato anche con l'aiuto dell'IA ad ottimizzare il più possibile (ad esempio anzichè fare 5 chiamate API una per ogni pagina ne viene fatta 1 per tutte e 250 le coin ma comunque il problema persiste).


# CryptoMAT

Un applicazione web per monitorare i prezzi delle criptovalute in tempo reale. Il progetto usa l'API di CoinGecko per recuperare i dati di mercato e mostrare informazioni dettagliate su centinaia di crypto.

## Caratteristiche

- **Lista criptovalute**: visualizza fino a 250 criptovalute con prezzi aggiornati, market cap e variazioni 24h
- **Dettagli moneta**: cliccando su una crypto si accede a una pagina con informazioni approfondite e grafici storici
- **Ricerca**: barra di ricerca per trovare velocemente le crypto per nome o simbolo
- **Ordinamento**: possibilità di ordinare per market cap, prezzo, nome o variazione percentuale
- **Grafici**: visualizzazione dello storico prezzi con intervalli giornaliero, settimanale e mensile
- **Responsive**: interfaccia ottimizzata per desktop e mobile

## Tecnologie utilizzate

- **React** con TypeScript per l'interfaccia
- **React Router** per la navigazione tra pagine
- **TanStack Query** per gestione delle chiamate API e caching
- **Recharts** per visualizazzione grafici
- **Vite** come build tool
- **CoinGecko API** per dati reali delle criptovalute

## Come funziona

L'applicazione fa richieste all'API pubblica di CoinGecko per ottenere i dati. Se l'API non risponde o raggiunge il limite di rate (cosa che capita spesso con API gratuita), l'app passa automaticamente a utilizzare dati mock generati localmente. Questo permette di testare l'applicazione anche senza connessione o quando API non disponibile.

I dati mock sono generati con seed deterministici quindi sono consistenti tra ricaricamenti diversi della pagina.

## Installazione

Prima bisogna clonare il repository e installare le dipendenze:

```bash
cd CryptoMAT
npm install
```

Poi per avviare il server di sviluppo:

```bash
npm run dev
```

L'applicazione sarà disponibile su `http://localhost:5173`

## Build produzione

Per creare una build ottimizzata per produzione:

```bash
npm run build
```

I file verranno generati nella cartella `dist/`

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
