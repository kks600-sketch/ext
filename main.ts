namespace easyMotor {

    // ตัวเลือกทิศทางเพื่อสร้างเป็นเมนูดรอปดาวน์ในบล็อก
    export enum CarDirection {
        // % block="เดินหน้า"
        Forward,
        // % block="ถอยหลัง"
        Backward,
        // % block="เลี้ยวซ้าย"
        TurnLeft,
        // % block="เลี้ยวขวา"
        TurnRight
    }

    /**
     * สั่งงานมอเตอร์ของรถให้เคลื่อนที่ตามทิศทางและความเร็วที่กำหนด
     * @param direction ทิศทางที่ต้องการให้รถวิ่ง
     * @param speed ความเร็วเป็นเปอร์เซ็นต์ 0 ถึง 100, eg: 50
     */
    // % block="ควบคุมรถ ให้ %direction ความเร็ว %speed %%"
    // % speed.min=0 speed.max=100
    export function move(direction: CarDirection, speed: number): void {
        // แปลงความเร็วจาก 0-100% ให้เป็นสัญญาณอนาล็อก 0-1023 ของ micro:bit
        let pwnVal = pins.map(speed, 0, 100, 0, 1023)

        if (direction === CarDirection.Forward) {
            // มอเตอร์ซ้ายเดินหน้า (P13=1, P14=PWM) | มอเตอร์ขวาเดินหน้า (P15=1, P16=PWM)
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        }
        else if (direction === CarDirection.Backward) {
            // มอเตอร์ซ้ายถอยหลัง (P13=0, P14=PWM) | มอเตอร์ขวาถอยหลัง (P15=0, P16=PWM)
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        }
        else if (direction === CarDirection.TurnLeft) {
            // เลี้ยวซ้าย: มอเตอร์ซ้ายถอยหลัง | มอเตอร์ขวาเดินหน้า
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        }
        else if (direction === CarDirection.TurnRight) {
            // เลี้ยวขวา: มอเตอร์ซ้ายเดินหน้า | มอเตอร์ขวาถอยหลัง
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        }
    }

    /**
     * สั่งให้รถหยุดวิ่งทันทีโดยการตัดกระแสไฟมอเตอร์ทุกดวง
     */
    // % block="หยุดรถทันที"
    export function stop(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
