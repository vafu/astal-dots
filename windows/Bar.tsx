import { Astal, Gdk } from "astal/gtk4"
import Workspaces from "../widgets/workspaces"

export default (gdkmonitor: Gdk.Monitor) =>
	<window
		gdkmonitor={gdkmonitor}
		name="Bar"
		exclusivity={Astal.WindowAnchor.TOP | Astal.WindowAnchor.LEFT | Astal.WindowAnchor.RIGHT}>
		<Workspaces />
	</window>
