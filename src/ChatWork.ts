export class ChatWork {

    private static readonly BASE_URL = "https://api.chatwork.com/v2";
    private headers: any;

    constructor(private token: string) {
        this.headers = {'X-ChatWorkToken': token}
    }

    private _sendRequest(path: string, method: string, payload: any): any {
        const url: string = ChatWork.BASE_URL + path;
        const options: any = {
            'method': method,
            'headers': this.headers,
            'payload': payload
        };

        Logger.log("url: " + url);
        Logger.log("options: " + JSON.stringify(options));
        
        const response: GoogleAppsScript.URL_Fetch.HTTPResponse = UrlFetchApp.fetch(url, options);
        if (response.getResponseCode() != 200) {
            throw new Error("Chatwork request error.\nResponse code: " + response.getResponseCode() + '\n' +response.getContentText());
        }
        return JSON.parse(response.getContentText());
    }

    private post(endpoint: string, postData: any): any {
        return this._sendRequest(endpoint, 'post', postData);
    }

    /**
     * メッセージ送信
     * @param roomId ルームID
     * @param body メッセージ本文
     * @param selfUnread 追加したメッセージを自分から見て未読とするか
     * @returns メッセージID
     */
    public sendMessage(roomId: string, body: string, selfUnread: boolean = false): string {
        const endpoint = '/rooms/' + roomId + '/messages';
        const postData: any = {
            'body': body,
            'self_unread': selfUnread? '1': '0'
        };
        const response: any = this.post(endpoint, postData);
        return response.message_id;
    }
}
