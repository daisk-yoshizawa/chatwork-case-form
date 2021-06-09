import {ChatWorkClient, ChatWork, FormToChatwork, sendCase} from './formToChatwork';

describe(FormToChatwork.name, () => {
    it ('Send message success', () => {
        const ChatWorkMock = jest.fn<ChatWork, []>().mockImplementation(() => {
            return {
                sendMessage: (params: any) => {
                    return true;
                }
            }
        });
        // const ChatWorkClientMock = jest.spyOn(ChatWorkClient.prototype, 'factory').mockReturnValue(new ChatWorkMock());
        const ChatWorkClientMock = jest.fn<ChatWorkClient, []>().mockImplementation(() => {
            return {
                factory: (params: any) => {
                    return new ChatWorkMock();
                }
            }
        });

        // GoogleAppsScript.Events.SheetsOnFormSubmit.
        // const SheetsOnFormSubmitMock = jest.fn<GoogleAppsScript.Events.SheetsOnFormSubmit, []>().mockImplementation(() => {
        //     return {
        //         authMode: null,
        //         triggerUid: null,
        //         user: null,
        //         namedValues: {
        //             FIELD_NAME_CASE_TYPE: ['case type'],
        //             FIELD_NAME_CASE_DETAIL: ['case detail']
        //         },
        //         renge: null,
        //         values: null
        //     }
        // });

        const formToChatwork = new FormToChatwork('Case Type', 'Case Detail');
        formToChatwork.sendMessage();
    });
});