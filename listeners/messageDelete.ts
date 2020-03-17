/*!
 * @author Sankarsan Kampa (k3rn31p4nic)
 * @copyright 2020 - The Bastion Bot Project
 */

import { Listener, Constants } from "tesseract";
import { Message } from "discord.js";

export = class MessageDeleteListener extends Listener {
    constructor() {
        super("messageDelete", {
            mode: Constants.LISTENER_MODE.ON,
        });
    }

    exec = async (message: Message): Promise<void> => {
        console.log(message.content);
    }
}
