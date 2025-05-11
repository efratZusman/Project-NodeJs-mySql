class ApiService {

    async checkResponseStatus(response) {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
    }

    async fetch(url) {
            const response = await fetch(url);
            return await this.checkResponseStatus(response);
    }

    async post(url,newData) {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            return await this.checkResponseStatus(response);
    }

    async delete(url) {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            await this.checkResponseStatus(response);
    }

    async patch(url, newData) {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newData),
            });
            return await this.checkResponseStatus(response);
    }
}
export default ApiService;
