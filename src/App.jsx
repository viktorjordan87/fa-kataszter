import { useEffect, useState } from "react";
import "./App.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
//core
import "primereact/resources/primereact.min.css";

//icons
import "primeicons/primeicons.css";

//primeflex
import "primeflex/primeflex.css";

const Content = ({ tree }) => {
	const properties = tree.properties;

	return (
		<div className="tree-popup-content">
			<h2> {properties.fajtanev_magyar + " (" + properties.fajtanev + ")"}</h2>
			<table>
				<tbody>
					<tr>
						<th>Sorszám</th>
						<td>{properties.sorszam}</td>
					</tr>
					<tr>
						<th>Parkrészlet</th>
						<td>{properties.kapcsolodo}</td>
					</tr>
					<tr>
						<th>Kapcsolódó fa</th>
						<td>{properties.kapcsolodo}</td>
					</tr>
					<tr>
						<th>Fajta</th>
						<td>{properties.fajta}</td>
					</tr>
					<tr>
						<th>Típus</th>
						<td>{properties.tipus}</td>
					</tr>
					<tr>
						<th>Jellegzetes-e</th>
						<td>{properties.jellegzetes}</td>
					</tr>
					<tr>
						<th>Őshonos-e</th>
						<td>{properties.oshonos}</td>
					</tr>
					<tr>
						<th>Törzsátmérő</th>
						<td>{properties.torzsatmero} cm</td>
					</tr>
					<tr>
						<th>Lombk. átmérő</th>
						<td> {properties.lombkorona_atmero}m</td>
					</tr>
					<tr>
						<th>Gyökérállapot</th>
						<td>{properties.gyokerzet_allapot}</td>
					</tr>
					<tr>
						<th>Törzsállapot</th>
						<td>{properties.torzs_allapot}</td>
					</tr>
					<tr>
						<th>Koronaállapot</th>
						<td>{properties.korona_allapot}</td>
					</tr>
					<tr>
						<th>Megjelenés</th>
						<td>{properties.megjelenes}</td>
					</tr>
				</tbody>
			</table>
			<h3>Örökbefogadás</h3>
			<table>
				<tbody>
					<tr>
						<th>Örökbefogadó neve</th>
						<td>{properties.orokbefogado}</td>
					</tr>
					<tr>
						<th>Örökbefogadás alkalma</th>
						<td>{properties.orokbe_celja}</td>
					</tr>
				</tbody>
			</table>
			<h3>Kezelési terv</h3>
			<table>
				<tbody>
					<tr>
						<th>Esetleges kivágás oka</th>
						<td>{properties.kivagas_oka}</td>
					</tr>
					<tr>
						<th>Esetleges kidőléskor teendő</th>
						<td>{properties.kidoles_teendo}</td>
					</tr>
					<tr>
						<th>Szakértői jelentés</th>
						<td>{properties.szakertoi_jelentes}</td>
					</tr>
					<tr>
						<th>Utolsó ellenőrzés dátuma</th>
						<td>{properties.utolso_ellenorzes}</td>
					</tr>
					<tr>
						<th>Egyéb megjegyzés</th>
						<td>{properties.egyeb_megj}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

const Sidebar = ({ datas, trees, setTrees }) => {
	const [sorszam, setSorszam] = useState();

	useEffect(() => {
		if (sorszam) {
			const newTrees = datas.filter((tree) => Number(tree.properties.sorszam) === Number(sorszam));
			setTrees(newTrees);
		}
	}, [sorszam]);

	/* Parkrészlet options */
	const parkreszletOptions = [...new Set(datas.map((tree) => tree.properties.kapcsolodo))];
	const [parkreszlet, setParkreszlet] = useState(null);

	useEffect(() => {
		if (parkreszlet) {
			const newTrees = datas.filter((tree) => tree.properties.kapcsolodo === parkreszlet);
			setTrees(newTrees);
		}
	}, [parkreszlet]);

	return (
		<aside className="sidebar">
			<h2>Szűrő</h2>
			{/* sorszám inputnumber field*/}
			{/* <div className="flex flex-column">
				<label
					htmlFor="sorszam"
					className="font-bold block mb-2"
				>
					Sorszám
				</label>
				<div className="flex flex-row">
					<InputNumber
						inputId="sorszam"
						value={sorszam}
						onChange={(e) => setSorszam(e.value)}
						minFractionDigits={0}
						maxFractionDigits={0}
					/>
					<Button
						icon="pi pi-search"
						rounded
						text
						aria-label="Filter"
						onClick={() => console.log()}
					/>
				</div>
			</div> */}
			{/* parkrészlet dropdown */}
			<div className="card flex justify-content-center">
				<label
					htmlFor="parkreszlet"
					className="font-bold block mb-2"
				>
					Parkrészlet
				</label>
				<Dropdown
					value={parkreszlet}
					onChange={(e) => setParkreszlet(e.value)}
					options={parkreszletOptions}
					htmlFor="parkreszlet"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* 
      Dropdown
      Fajta	
Típus	
Jellegzetes-e	
Őshonos-e

*/}

			{/* örökbefogadott igen nem orokbefogadott van e text itt igen, nincs nem */}

			{/* kivagas_oka Kivágandó: igen nem */}
		</aside>
	);
};

function App() {
	/* For filtering */
	const [trees, setTrees] = useState([]);
	/* For basic datas that are not modified */
	const [datas, setDatas] = useState([]);

	const getData = async () => {
		const response = await fetch("https://fakataszter.s3.eu-central-1.amazonaws.com/fakataszter.geojson");
		const jsonData = await response.json();
		setDatas(Object.values(jsonData).at(1));
		setTrees(Object.values(jsonData).at(1));
	};

	/* Load data */
	useEffect(() => {
		getData();
	}, []);

	if (trees.length === 0) return;

	return (
		<section className="fa-map-container">
			<MapContainer
				className="fakataszter-map"
				center={[47.574, 18.893]}
				zoom={17}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{trees.map((tree, index) => {
					const position = tree.geometry.coordinates;

					return (
						<Marker
							position={[...position].reverse()}
							key={index}
						>
							<Popup>
								<Content tree={tree} />
							</Popup>
						</Marker>
					);
				})}
			</MapContainer>
			<Sidebar
				datas={datas}
				trees={trees}
				setTrees={setTrees}
			/>
		</section>
	);
}

export default App;
