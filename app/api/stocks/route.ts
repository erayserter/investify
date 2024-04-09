import {NextRequest} from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const data: any = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${body.query}&apikey=B1RTBBEBYASM2PBW`)
        .then(res => res.json())

    return new Response(JSON.stringify(data), { status: 200 });
}
