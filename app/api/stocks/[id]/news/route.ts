import {NextRequest} from "next/server";

export async function GET(request: NextRequest, { params } : { params: { id: string } }) {
    const id = params.id
    console.log(id)
    const data: any = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=${id}&apikey=ECJCTAUGNRXNF2LN`)
        .then(res => res.json())

    return new Response(JSON.stringify(data), { status: 200 });
}
