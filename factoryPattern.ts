interface iNotification{
    send(message: string): void;
}

class EmailNotification implements iNotification{
    send(message: string): void{
        console.log("Email Notification", message);
    }
}

class SMSNotification implements iNotification{
    send(message: string): void{
        console.log("SMS Notification", message);
    }
}

class NotificationFactory{
    static createNotification(type: string) : iNotification{
        switch(type){
            case "email":
                return new EmailNotification();
            case "sms" :
                return new SMSNotification();
            default:
            throw new Error("Invalid notification type");
        }
    }
}

const notification = NotificationFactory.createNotification("email");
notification.send("Hello World");
