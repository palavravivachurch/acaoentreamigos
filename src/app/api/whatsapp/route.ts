import {NextRequest, NextResponse} from 'next/server';
import axios from 'axios';


export async function GET(request: NextRequest) {

    try {
        const url = new URL(request.url);
        let zap = url.searchParams.get('zap');
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${process.env.EVO_URL}/chat/whatsappNumbers/${process.env.EVO_INSTANCE}`,
            headers: {
                'Content-Type': 'application/json',
                'apikey': '626f33bd63dd5461ee05b952dc4eddb3'
            },
            data: JSON.stringify({
                'numbers': [
                    zap
                ]
            })
        };
        let axiosResponse = await axios.request(config);
        return NextResponse.json(axiosResponse.data[0].exists, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        console.log(process.env.EVO_URL)
        console.log(process.env.EVO_INSTANCE)
        return NextResponse.json(
            {error: 'Failed to get admins', errorobj: error},
            {
                status: 500
            }
        );
    }
}
