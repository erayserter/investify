import {NextRequest} from "next/server";

export async function GET(request: NextRequest, { params } : { params: { id: string } }) {
    const id = params.id
    const data: any = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${id}&apikey=ECJCTAUGNRXNF2LN`)
        .then(res => res.json())

    return new Response(JSON.stringify(data), { status: 200 });
}
