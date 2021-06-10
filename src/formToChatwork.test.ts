import {FormToChatwork, sendCase} from './formToChatwork';

describe(FormToChatwork.name, () => {
    beforeAll(() => {
        Logger.log = jest.fn().mockImplementation(msg => {
            return console.log(msg);
        });
    });

    it ('Send message success', () => {

        UrlFetchApp.fetch = jest.fn().mockImplementation(() => {
            return {
                getResponseCode: (): number => {return 200},
                getContentText: (): string => {
                    return "{\"message_id\": \"1234567890\"}";
                }
            }
        });

        const formToChatwork = new FormToChatwork('Case Type', 'Case Detail');
        const res: string = formToChatwork.sendMessage();

        expect(UrlFetchApp.fetch).toBeCalled();
        expect(res).toBe("1234567890");
    });

    it ('Send message error', () => {

        UrlFetchApp.fetch = jest.fn().mockImplementation(() => {
            return {
                getResponseCode: (): number => {return 503},
                getContentText: (): string => {
                    return "{\"message\": \"error\"}";
                }
            }
        });

        const formToChatwork = new FormToChatwork('Case Type', 'Case Detail');
        expect(formToChatwork.sendMessage).toThrow(Error);
    });
});