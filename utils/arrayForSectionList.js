import _ from "lodash";
import moment from "moment";

export function fromArrayToSectionData(data) {
	let ds = _.groupBy(data, d => moment(d.added_at).format("LL"));
	ds = _.reduce(
		ds,
		(acc, next, index) => {
			acc.push({
				key: index,
				test: moment(index, "LL").format("YYYY-MM-DD"),
				data: next,
			});
			return acc;
		},
		[]
	);
	ds = _.orderBy(ds, ["test"], ["desc", "asc"]);
	return ds;
}
