export async function GET() {
    const data: any = await fetch("https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=ECJCTAUGNRXNF2LN").then(res => res.json())

    return new Response(JSON.stringify(data), { status: 200 });
}
