import {ChatWork} from './ChatWork';

const TOKEN = '146a1cff63a579dc16f637dd42b4a67c';
const ROOM_ID = '232088381';

const FIELD_NAME_CASE_TYPE = '問い合わせ種類';
const FIELD_NAME_CASE_DETAIL = '問い合わせ内容';
const POST_LABEL_TITLE = '[info][title]お問合せ[/title]';
const POST_LABEL_CASE_TYPE = FIELD_NAME_CASE_TYPE + ': ';
const POST_LABEL_CASE_DETAIL = FIELD_NAME_CASE_DETAIL + ': ';

export class FormToChatwork {

    constructor(private caseType: string, private caseDetail: string) {}

    sendMessage(): string {
        let message = '';
        message += POST_LABEL_TITLE + "\n";
        message += POST_LABEL_CASE_TYPE + this.caseType + "\n";
        message += POST_LABEL_CASE_DETAIL + this.caseDetail + "\n";

        const chatWork: ChatWork = new ChatWork(TOKEN);
        return chatWork.sendMessage(ROOM_ID, message);
    }
}

export function sendCase(e: GoogleAppsScript.Events.SheetsOnFormSubmit) {
    const caseType: string = e.namedValues[FIELD_NAME_CASE_TYPE][0];
    const caseDetail: string =  e.namedValues[FIELD_NAME_CASE_DETAIL][0];
    const formToChatwork = new FormToChatwork(caseType, caseDetail);
    formToChatwork.sendMessage();
}
