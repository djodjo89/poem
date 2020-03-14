package com.poem7.model

import org.jnativehook.GlobalScreen
import org.jnativehook.keyboard.NativeKeyEvent
import org.jnativehook.keyboard.NativeKeyEvent.*
import org.jnativehook.keyboard.NativeKeyListener


class KeyListener : NativeKeyListener {
    fun press(keyCode: Int) {
        GlobalScreen.postNativeEvent(NativeKeyEvent(
                NATIVE_KEY_PRESSED,
                0x00,
                0x00,
                keyCode,
                CHAR_UNDEFINED,
                KEY_LOCATION_STANDARD))
    }

    override fun nativeKeyTyped(nke: NativeKeyEvent?) {
        println("typed")
    }

    override fun nativeKeyPressed(nke: NativeKeyEvent?) {
        if (nke?.keyCode!! == VC_SPACE) {
            println("Physical - Pressed")

            press(VC_A)
        }
        /*
        if (NativeKeyEvent.VC_SPACE == nke?.keyCode!!) {
            println("Here")
            val keyEvent = NativeKeyEvent(
                    NativeKeyEvent.NATIVE_KEY_PRESSED,
                    0x00,  // Modifiers
                    0x00,  // Raw Code
                    NativeKeyEvent.VC_A,
                    NativeKeyEvent.CHAR_UNDEFINED,
                    NativeKeyEvent.KEY_LOCATION_STANDARD)
            press(keyEvent)
            GlobalScreen.unregisterNativeHook()
            println(NativeKeyEvent.getKeyText(nke.keyCode))
            /*
            try {
                GlobalScreen.unregisterNativeHook()
            } catch (e: NativeHookException) {
                println("not here")
                e.printStackTrace()
            }
            GlobalScreen.registerNativeHook()
             */
        }

         */
    }

    override fun nativeKeyReleased(nke: NativeKeyEvent?) {
        println("released")
    }
}