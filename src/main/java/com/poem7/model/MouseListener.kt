package com.poem7.model

import org.jnativehook.mouse.NativeMouseEvent
import org.jnativehook.mouse.NativeMouseListener

class MouseListener: NativeMouseListener {
    override fun nativeMousePressed(p0: NativeMouseEvent?) {
        println("mouse pressed")
    }

    override fun nativeMouseClicked(p0: NativeMouseEvent?) {
        println("mouse clicked")
    }

    override fun nativeMouseReleased(p0: NativeMouseEvent?) {
        println("mouse released")
    }
}