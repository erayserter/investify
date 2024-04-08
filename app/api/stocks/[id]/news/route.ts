import {NextRequest} from "next/server";

export async function GET(request: NextRequest, { params } : { params: { id: string } }) {
    const id = params.id
    const data: any = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${id}&apikey=B1RTBBEBYASM2PBW`)
        .then(res => res.json())

    return new Response(JSON.stringify(data), { status: 200 });
}
