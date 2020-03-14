package com.poem7.model

import org.jnativehook.GlobalScreen
import org.jnativehook.NativeHookException
import org.jnativehook.keyboard.NativeKeyEvent
import org.jnativehook.keyboard.NativeKeyListener
import kotlin.system.exitProcess


class GlobalKeyListenerExample : NativeKeyListener {
    override fun nativeKeyPressed(e: NativeKeyEvent) {
        println("Key Pressed: " + NativeKeyEvent.getKeyText(e.keyCode))
        if (e.keyCode == NativeKeyEvent.VC_ESCAPE) {
            GlobalScreen.unregisterNativeHook()
        }
    }

    override fun nativeKeyReleased(e: NativeKeyEvent) {
        println("Key Released: " + NativeKeyEvent.getKeyText(e.keyCode))
    }

    override fun nativeKeyTyped(e: NativeKeyEvent) {
        println("Key Typed: " + NativeKeyEvent.getKeyText(e.keyCode))
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            try {
                GlobalScreen.registerNativeHook()
            } catch (ex: NativeHookException) {
                System.err.println("There was a problem registering the native hook.")
                System.err.println(ex.message)
                exitProcess(1)
            }
            GlobalScreen.addNativeKeyListener(GlobalKeyListenerExample())
        }
    }
}