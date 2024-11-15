import { App, Astal, Gdk } from "astal/gtk4"
import { Widget } from "astal/gtk4"
import style from "./style.scss"
import Adw from "gi://Adw?version=1"
import Workspaces from "./widgets/workspaces"

App.start({
    css: style,
    main() {
        Adw.init()
        App.get_monitors().forEach(m => Bar(m).catch(e => console.log(e)))
    },
})


export default async function Bar(gdkmonitor: Gdk.Monitor) {
    const w = new Widget.Window({
        gdkmonitor: gdkmonitor,
        name: "name",
        exclusivity: Astal.Exclusivity.EXCLUSIVE,
        anchor: Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT,
    }, Workspaces())
    return w
}
