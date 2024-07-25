


interface FetchOptions {
    method: string;
    body?: any;
    token?: string;
}

interface FetchResults {
    ok: boolean;
    data: any;
}

const useFetch = () => {
    const fetchData = async( endpoint: string, method: string, body?: any, token?: any): Promise<FetchResults> => {
        const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
            method,
            headers : {
                "Content-type" : "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(body),
        });

        const data = await res.json();

        let returnValue: FetchResults = {ok: false, data: null};
        if(res.ok) {
            if(data.status ==="error") {
                returnValue = {ok : false, data: data.message};
            } else {
                returnValue = {ok: true, data};
            }
        }else {
            if(data?.errors && Array.isArray(data.errors)){
                const messages = data.errors.map((item: any) => item.msg);
                returnValue = {ok: false, data: messages};
            } else if (data?.status === "error") {
                returnValue = { ok: false, data: data.message || data.msg};
            }else {
                console.log(data);
                returnValue = {ok: false, data: "An Error has occured"};
            }
        }
        return returnValue;
    };
    return fetchData;
};

export default useFetch;