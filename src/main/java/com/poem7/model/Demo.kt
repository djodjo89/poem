package com.poem7.model

import org.jnativehook.GlobalScreen
import org.jnativehook.NativeHookException
import org.jnativehook.NativeInputEvent
import org.jnativehook.dispatcher.SwingDispatchService
import org.jnativehook.keyboard.NativeKeyEvent
import org.jnativehook.keyboard.NativeKeyListener
import org.jnativehook.mouse.NativeMouseEvent
import org.jnativehook.mouse.NativeMouseInputListener
import org.jnativehook.mouse.NativeMouseWheelEvent
import org.jnativehook.mouse.NativeMouseWheelListener
import java.awt.BorderLayout
import java.awt.Color
import java.awt.Dimension
import java.awt.event.*
import java.io.PrintWriter
import java.io.StringWriter
import java.util.*
import java.util.logging.*
import java.util.logging.Formatter
import javax.swing.*
import javax.swing.text.BadLocationException
import kotlin.system.exitProcess

/* JNativeHook: Global keyboard and mouse hooking for Java.
 * Copyright (C) 2006-2018 Alexander Barker.  All Rights Received.
 * https://github.com/kwhat/jnativehook/
 *
 * JNativeHook is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * JNativeHook is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
// Imports.


/**
 * A demonstration of how to use the JNativeHook library.
 *
 * @author    Alexander Barker ([alex@1stleg.com](mailto:alex@1stleg.com))
 * @version    2.0
 * @since    1.0
 *
 * @see GlobalScreen
 *
 * @see NativeKeyListener
 */
class Demo : JFrame(), ActionListener, ItemListener, NativeKeyListener, NativeMouseInputListener, NativeMouseWheelListener, WindowListener {
    /** Menu Items  */
    private val menuSubListeners: JMenu
    private val menuItemQuit: JMenuItem
    private val menuItemClear: JMenuItem
    private val menuItemEnable: JCheckBoxMenuItem
    private val menuItemKeyboardEvents: JCheckBoxMenuItem
    private val menuItemButtonEvents: JCheckBoxMenuItem
    private val menuItemMotionEvents: JCheckBoxMenuItem
    private val menuItemWheelEvents: JCheckBoxMenuItem

    /** The text area to display event info.  */
    private val txtEventInfo: JTextArea

    /**
     * @see java.awt.event.ActionListener.actionPerformed
     */
    override fun actionPerformed(e: ActionEvent) {
        if (e.source === menuItemQuit) {
            dispose()
        } else if (e.source === menuItemClear) {
            txtEventInfo.text = ""
        }
    }

    /**
     * @see java.awt.event.ItemListener.itemStateChanged
     */
    override fun itemStateChanged(e: ItemEvent) {
        val item = e.itemSelectable
        if (item === menuItemEnable) {
            try {
                // Keyboard checkbox was changed, adjust listeners accordingly.
                if (e.stateChange == ItemEvent.SELECTED) {
                    // Initialize native hook.  This is done on window open because the
                    // listener requires the txtEventInfo object to be constructed.
                    GlobalScreen.registerNativeHook()
                } else {
                    GlobalScreen.unregisterNativeHook()
                }
            } catch (ex: NativeHookException) {
                txtEventInfo.append("""
    Error: ${ex.message}
    
    """.trimIndent())
            }

            // Set the enable menu item to the state of the hook.
            menuItemEnable.state = GlobalScreen.isNativeHookRegistered()

            // Set enable/disable the sub-menus based on the enable menu item's state.
            menuSubListeners.isEnabled = menuItemEnable.state
        } else if (item === menuItemKeyboardEvents) {
            // Keyboard checkbox was changed, adjust listeners accordingly
            if (e.stateChange == ItemEvent.SELECTED) {
                GlobalScreen.addNativeKeyListener(this)
            } else {
                GlobalScreen.removeNativeKeyListener(this)
            }
        } else if (item === menuItemButtonEvents) {
            // Button checkbox was changed, adjust listeners accordingly
            if (e.stateChange == ItemEvent.SELECTED) {
                GlobalScreen.addNativeMouseListener(this)
            } else {
                GlobalScreen.removeNativeMouseListener(this)
            }
        } else if (item === menuItemMotionEvents) {
            // Motion checkbox was changed, adjust listeners accordingly
            if (e.stateChange == ItemEvent.SELECTED) {
                GlobalScreen.addNativeMouseMotionListener(this)
            } else {
                GlobalScreen.removeNativeMouseMotionListener(this)
            }
        } else if (item === menuItemWheelEvents) {
            // Motion checkbox was changed, adjust listeners accordingly
            if (e.stateChange == ItemEvent.SELECTED) {
                GlobalScreen.addNativeMouseWheelListener(this)
            } else {
                GlobalScreen.removeNativeMouseWheelListener(this)
            }
        }
    }

    /**
     * @see org.jnativehook.keyboard.NativeKeyListener.nativeKeyPressed
     */
    override fun nativeKeyPressed(e: NativeKeyEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.keyboard.NativeKeyListener.nativeKeyReleased
     */
    override fun nativeKeyReleased(e: NativeKeyEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.keyboard.NativeKeyListener.nativeKeyTyped
     */
    override fun nativeKeyTyped(e: NativeKeyEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseListener.nativeMouseClicked
     */
    override fun nativeMouseClicked(e: NativeMouseEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseListener.nativeMousePressed
     */
    override fun nativeMousePressed(e: NativeMouseEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseListener.nativeMouseReleased
     */
    override fun nativeMouseReleased(e: NativeMouseEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseMotionListener.nativeMouseMoved
     */
    override fun nativeMouseMoved(e: NativeMouseEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseMotionListener.nativeMouseDragged
     */
    override fun nativeMouseDragged(e: NativeMouseEvent) {
        displayEventInfo(e)
    }

    /**
     * @see org.jnativehook.mouse.NativeMouseWheelListener.nativeMouseWheelMoved
     */
    override fun nativeMouseWheelMoved(e: NativeMouseWheelEvent) {
        displayEventInfo(e)
    }

    /**
     * Write information about the `NativeInputEvent` to the text
     * window.
     *
     * @param e the native input event to display.
     */
    private fun displayEventInfo(e: NativeInputEvent) {
        txtEventInfo.append("""
    
    ${e.paramString()}
    """.trimIndent())
        try {
            //Clean up the history to reduce memory consumption.
            if (txtEventInfo.lineCount > 100) {
                txtEventInfo.replaceRange("", 0, txtEventInfo.getLineEndOffset(txtEventInfo.lineCount - 1 - 100))
            }
            txtEventInfo.caretPosition = txtEventInfo.getLineStartOffset(txtEventInfo.lineCount - 1)
        } catch (ex: BadLocationException) {
            txtEventInfo.caretPosition = txtEventInfo.document.length
        }
    }

    /**
     * Unimplemented
     *
     * @see java.awt.event.WindowListener.windowActivated
     */
    override fun windowActivated(e: WindowEvent) { /* Do Nothing */
    }

    /**
     * Unimplemented
     *
     * @see java.awt.event.WindowListener.windowClosing
     */
    override fun windowClosing(e: WindowEvent) { /* Do Nothing */
    }

    /**
     * Unimplemented
     *
     * @see java.awt.event.WindowListener.windowDeactivated
     */
    override fun windowDeactivated(e: WindowEvent) { /* Do Nothing */
    }

    /**
     * Unimplemented
     *
     * @see java.awt.event.WindowListener.windowDeiconified
     */
    override fun windowDeiconified(e: WindowEvent) { /* Do Nothing */
    }

    /**
     * Unimplemented
     *
     * @see java.awt.event.WindowListener.windowIconified
     */
    override fun windowIconified(e: WindowEvent) { /* Do Nothing */
    }

    /**
     * Display information about the native keyboard and mouse along with any
     * errors that may have occurred.
     *
     * @see java.awt.event.WindowListener.windowOpened
     */
    override fun windowOpened(e: WindowEvent) {
        // Return the focus to the window.
        this.requestFocusInWindow()

        // Enable the hook, this will cause the GlobalScreen to be initilized.
        menuItemEnable.isSelected = true

        // Please note that these properties are not available until after the GlobalScreen class is initialized.
        txtEventInfo.append("JNativeHook Version " + System.getProperty("jnativehook.lib.version"))
        txtEventInfo.append("""
    
    Auto Repeat Rate: ${System.getProperty("jnativehook.key.repeat.rate")}
    """.trimIndent())
        txtEventInfo.append("""
    
    Auto Repeat Delay: ${System.getProperty("jnativehook.key.repeat.delay")}
    """.trimIndent())
        txtEventInfo.append("""
    
    Double Click Time: ${System.getProperty("jnativehook.button.multiclick.iterval")}
    """.trimIndent())
        txtEventInfo.append("""
    
    Pointer Sensitivity: ${System.getProperty("jnativehook.pointer.sensitivity")}
    """.trimIndent())
        txtEventInfo.append("""
    
    Pointer Acceleration Multiplier: ${System.getProperty("jnativehook.pointer.acceleration.multiplier")}
    """.trimIndent())
        txtEventInfo.append("""
    
    Pointer Acceleration Threshold: ${System.getProperty("jnativehook.pointer.acceleration.threshold")}
    """.trimIndent())
        try {
            txtEventInfo.caretPosition = txtEventInfo.getLineStartOffset(txtEventInfo.lineCount - 1)
        } catch (ex: BadLocationException) {
            txtEventInfo.caretPosition = txtEventInfo.document.length
        }

        // Enable all of the listeners.
        menuItemKeyboardEvents.isSelected = true
        menuItemButtonEvents.isSelected = true
        menuItemMotionEvents.isSelected = true
        menuItemWheelEvents.isSelected = true
    }

    /**
     * Finalize and exit the program.
     *
     * @see java.awt.event.WindowListener.windowClosed
     */
    override fun windowClosed(e: WindowEvent) {
        // Clean up the native hook.
        try {
            GlobalScreen.unregisterNativeHook()
        } catch (ex: NativeHookException) {
            ex.printStackTrace()
        }
        System.runFinalization()
        exitProcess(0)
    }

    /**
     * A simple log formatter.
     *
     * @see java.util.Formatter
     */
    private inner class LogFormatter : Formatter() {
        override fun format(record: LogRecord): String {
            val line = StringBuilder()
            line.append(Date(record.millis))
                    .append(" ")
                    .append(record.level.localizedName)
                    .append(":\t")
                    .append(formatMessage(record))
            if (record.thrown != null) {
                try {
                    val sw = StringWriter()
                    val pw = PrintWriter(sw)
                    record.thrown.printStackTrace(pw)
                    pw.close()
                    line.append(sw.toString())
                    sw.close()
                } catch (ex: Exception) { /* Do Nothing */
                }
            }
            return line.toString()
        }
    }

    companion object {
        /** The Constant serialVersionUID.  */
        private const val serialVersionUID = 1541183202160543102L

        /** Logging  */
        private val logger = Logger.getLogger(GlobalScreen::class.java.getPackage().name)

        /**
         * The demo project entry point.
         *
         * @param args unused.
         */
        @JvmStatic
        fun main(args: Array<String>) {
            val copyright = StringBuffer("\n")
                    .append("JNativeHook: Global keyboard and mouse hooking for Java.\n")
                    .append("Copyright (C) 2006-2018 Alexander Barker.  All Rights Received.\n")
                    .append("https://github.com/kwhat/jnativehook/\n")
                    .append("\n")
                    .append("JNativeHook is free software: you can redistribute it and/or modify\n")
                    .append("it under the terms of the GNU Lesser General Public License as published\n")
                    .append("by the Free Software Foundation, either version 3 of the License, or\n")
                    .append("(at your option) any later version.\n")
                    .append("\n")
                    .append("JNativeHook is distributed in the hope that it will be useful,\n")
                    .append("but WITHOUT ANY WARRANTY; without even the implied warranty of\n")
                    .append("MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n")
                    .append("GNU General Public License for more details.\n")
                    .append("\n")
                    .append("You should have received a copy of the GNU Lesser General Public License\n")
                    .append("along with this program.  If not, see <http://www.gnu.org/licenses/>.\n")
            println(copyright)
            SwingUtilities.invokeLater { Demo() }
        }
    }

    /**
     * Instantiates a new native hook demo.
     */
    init {
        // Setup the main window.
        title = "JNativeHook Demo"
        layout = BorderLayout()
        defaultCloseOperation = WindowConstants.DISPOSE_ON_CLOSE
        setSize(600, 300)
        addWindowListener(this)
        val menuBar = JMenuBar()

        // Create the file menu.
        val menuFile = JMenu("File")
        menuFile.mnemonic = KeyEvent.VK_F
        menuBar.add(menuFile)
        menuItemQuit = JMenuItem("Quit", KeyEvent.VK_Q)
        menuItemQuit.addActionListener(this)
        menuItemQuit.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_F4, ActionEvent.ALT_MASK)
        menuItemQuit.accessibleContext.accessibleDescription = "Exit the program"
        menuFile.add(menuItemQuit)

        // Create the view.
        val menuView = JMenu("View")
        menuView.mnemonic = KeyEvent.VK_V
        menuBar.add(menuView)
        menuItemClear = JMenuItem("Clear", KeyEvent.VK_C)
        menuItemClear.addActionListener(this)
        menuItemClear.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_C, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuItemClear.accessibleContext.accessibleDescription = "Clear the screen"
        menuView.add(menuItemClear)
        menuView.addSeparator()
        menuItemEnable = JCheckBoxMenuItem("Enable Native Hook")
        menuItemEnable.addItemListener(this)
        menuItemEnable.mnemonic = KeyEvent.VK_H
        menuItemEnable.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_H, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuView.add(menuItemEnable)

        // Create the listeners sub menu.
        menuSubListeners = JMenu("Listeners")
        menuSubListeners.mnemonic = KeyEvent.VK_L
        menuView.add(menuSubListeners)
        menuItemKeyboardEvents = JCheckBoxMenuItem("Keyboard Events")
        menuItemKeyboardEvents.addItemListener(this)
        menuItemKeyboardEvents.mnemonic = KeyEvent.VK_K
        menuItemKeyboardEvents.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_K, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuSubListeners.add(menuItemKeyboardEvents)
        menuItemButtonEvents = JCheckBoxMenuItem("Button Events")
        menuItemButtonEvents.addItemListener(this)
        menuItemButtonEvents.mnemonic = KeyEvent.VK_B
        menuItemButtonEvents.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_B, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuSubListeners.add(menuItemButtonEvents)
        menuItemMotionEvents = JCheckBoxMenuItem("Motion Events")
        menuItemMotionEvents.addItemListener(this)
        menuItemMotionEvents.mnemonic = KeyEvent.VK_M
        menuItemMotionEvents.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_M, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuSubListeners.add(menuItemMotionEvents)
        menuItemWheelEvents = JCheckBoxMenuItem("Wheel Events")
        menuItemWheelEvents.addItemListener(this)
        menuItemWheelEvents.mnemonic = KeyEvent.VK_W
        menuItemWheelEvents.accelerator = KeyStroke.getKeyStroke(KeyEvent.VK_W, ActionEvent.CTRL_MASK + ActionEvent.SHIFT_MASK)
        menuSubListeners.add(menuItemWheelEvents)
        jMenuBar = menuBar

        // Create feedback area.
        txtEventInfo = JTextArea()
        txtEventInfo.isEditable = false
        txtEventInfo.background = Color(0xFF, 0xFF, 0xFF)
        txtEventInfo.foreground = Color(0x00, 0x00, 0x00)
        txtEventInfo.text = ""
        val scrollPane = JScrollPane(txtEventInfo)
        scrollPane.preferredSize = Dimension(375, 125)
        add(scrollPane, BorderLayout.CENTER)


        // Disable parent logger and set the desired level.
        logger.useParentHandlers = false
        logger.level = Level.ALL

        // Add our custom formatter to a console handler.
        val handler = ConsoleHandler()
        handler.formatter = LogFormatter()
        handler.level = Level.ALL
        logger.addHandler(handler)

        /* Note: JNativeHook does *NOT* operate on the event dispatching thread.
		 * Because Swing components must be accessed on the event dispatching
		 * thread, you *MUST* wrap access to Swing components using the
		 * SwingUtilities.invokeLater() or EventQueue.invokeLater() methods.
		 */GlobalScreen.setEventDispatcher(SwingDispatchService())
        isVisible = true
    }
}