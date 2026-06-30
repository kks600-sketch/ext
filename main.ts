namespace customMotor2 {

    export enum MotorDir {
        // % block="เดินหน้า"
        Forward,
        // % block="ถอยหลัง"
        Backward
    }

    /**
     * สั่งงานมอเตอร์ให้เคลื่อนที่ เดินหน้า หรือ ถอยหลัง
     * @param direction ทิศทางเคลื่อนที่
     * @param speed ความเร็ว 0-100 %, eg: 60
     */
    // % block="สั่งรถ %direction ความเร็ว %speed %%"
    // % speed.min=0 speed.max=100
    export function move(direction: MotorDir, speed: number): void {
        let pwnVal = pins.map(speed, 0, 100, 0, 1023)
        if (direction === MotorDir.Forward) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 1)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        } else if (direction === MotorDir.Backward) {
            pins.digitalWritePin(DigitalPin.P13, 0)
            pins.analogWritePin(AnalogPin.P14, pwnVal)
            pins.digitalWritePin(DigitalPin.P15, 0)
            pins.analogWritePin(AnalogPin.P16, pwnVal)
        }
    }

    /**
     * สั่งให้มอเตอร์รถหยุดวิ่งทันที
     */
    // % block="หยุดรถ"
    export function stop(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.digitalWritePin(DigitalPin.P16, 0)
    }
}
