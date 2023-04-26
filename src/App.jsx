import { useEffect, useState } from "react";
import "./App.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { InputNumber } from "primereact/inputnumber";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
// import { Sidebar as PrimeSidebar } from "primereact/sidebar";

//core
import "primereact/resources/primereact.min.css";

//style
import "primereact/resources/themes/lara-light-blue/theme.css";

//icons
import "primeicons/primeicons.css";

//primeflex
import "primeflex/primeflex.css";


//<h2> {properties.fajtanev_magyar + " (" + properties.fajtanev + ")"}</h2>
/*
<tr>
						<th>Kapcsolódó fa</th>
						<td>{properties.kapcsolodo}</td>
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

*/



const Content = ({ tree }) => {
	const properties = tree.properties;

	return (
		<div className="tree-popup-content">
			
			<h2>{properties.fajtanev_magyar}</h2>
			<h3>{properties.fajtanev}</h3>
			<table width="300">
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
			
		</div>
	);
};

const Sidebar = ({ datas, trees, setTrees }) => {
	/* sorszam */
	const [sorszam, setSorszam] = useState();

	const handleSorszamClick = () => {
		if (sorszam) {
			const newTrees = datas.filter((tree) => Number(tree.properties.sorszam) === Number(sorszam));
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
	};

	const resetSorszamClick = () => {
		setSorszam("");
		setTrees(datas);
	};

	/* Parkrészlet options */
	const parkreszletOptions = [...new Set(datas.map((tree) => tree.properties.parkreszlet))];
	const [parkreszlet, setParkreszlet] = useState(null);

	useEffect(() => {
		if (parkreszlet) {
			const newTrees = datas.filter((tree) => tree.properties.parkreszlet === parkreszlet);
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [parkreszlet]);

	/* Fajta options */
	const fajtaOptions = [...new Set(datas.map((tree) => tree.properties.fajta))];
	const [fajta, setFajta] = useState(null);

	useEffect(() => {
		if (fajta) {
			const newTrees = datas.filter((tree) => tree.properties.fajta === fajta);
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [fajta]);

	/* Típus options */
	const tipusOptions = [...new Set(datas.map((tree) => tree.properties.tipus))];
	const [tipus, setTipus] = useState(null);

	useEffect(() => {
		if (tipus) {
			const newTrees = datas.filter((tree) => tree.properties.tipus === tipus);
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tipus]);

	/* jellegzetes options */
	const jellegzetesOptions = [...new Set(datas.map((tree) => tree.properties.jellegzetes))];
	const [jellegzetes, setJellegzetes] = useState(null);

	useEffect(() => {
		if (jellegzetes) {
			const newTrees = datas.filter((tree) => tree.properties.jellegzetes === jellegzetes);
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [jellegzetes]);

	/* oshonos options */
	const oshonosOptions = [...new Set(datas.map((tree) => tree.properties.oshonos))];
	const [oshonos, setOshonos] = useState(null);

	useEffect(() => {
		if (oshonos) {
			const newTrees = datas.filter((tree) => tree.properties.oshonos === oshonos);
			setTrees(newTrees);
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [oshonos]);

	/* orokbefogado options */
	const orokbefogadoOptions = [...new Set(datas.map((tree) => tree.properties.orokbefogado))].map((el) => {
		if (el === "") return "Nem";
		if (el !== "") return "Igen";
	});
	const [orokbefogado, setOrokbefogado] = useState(null);

	useEffect(() => {
		if (orokbefogado) {
			if (orokbefogado === "Igen") {
				const newTrees = datas.filter((tree) => tree.properties.orokbefogado !== "");
				setTrees(newTrees);
			}
			if (orokbefogado === "Nem") {
				const newTrees = datas.filter((tree) => tree.properties.orokbefogado === "");
				setTrees(newTrees);
			}
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orokbefogado]);

	/* kivagas options */
	const kivagasOptions = [...new Set(datas.map((tree) => tree.properties.kivagas_oka))].map((el) => {
		if (el === "") return "Nem";
		if (el !== "") return "Igen";
	});

	const [kivagas, setKivagas] = useState(null);

	useEffect(() => {
		if (kivagas) {
			if (kivagas === "Igen") {
				const newTrees = datas.filter((tree) => tree.properties.kivagas_oka !== "");
				setTrees(newTrees);
			}
			if (kivagas === "Nem") {
				const newTrees = datas.filter((tree) => tree.properties.kivagas_oka === "");
				setTrees(newTrees);
			}
		} else {
			setTrees(datas);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [kivagas]);

	return (
		<aside className="sidebar">
			<h2>Szűrő ({trees.length} találat)</h2>
			{/* sorszám inputnumber field*/}
			<div className="flex flex-column">
				<label
					htmlFor="sorszam"
					className=" block mb-2"
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
						onClick={() => handleSorszamClick()}
					/>
					<Button
						icon="pi pi-times"
						rounded
						text
						severity="danger"
						aria-label="Cancel"
						onClick={() => resetSorszamClick()}
					/>
				</div>
			</div>
			{/* parkrészlet dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="parkreszlet"
					className=" block mb-2 mt-1"
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
			{/* fajta dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="fajta"
					className=" block mb-2 mt-1"
				>
					Fajta
				</label>
				<Dropdown
					value={fajta}
					onChange={(e) => setFajta(e.value)}
					options={fajtaOptions}
					htmlFor="fajta"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* tipus dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="tipus"
					className=" block mb-2 mt-1"
				>
					Fajta
				</label>
				<Dropdown
					value={tipus}
					onChange={(e) => setTipus(e.value)}
					options={tipusOptions}
					htmlFor="tipus"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* jellegzetes dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="jellegzetes"
					className=" block mb-2 mt-1"
				>
					Jellegzetes
				</label>
				<Dropdown
					value={jellegzetes}
					onChange={(e) => setJellegzetes(e.value)}
					options={jellegzetesOptions}
					htmlFor="jellegzetes"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* oshonos dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="oshonos"
					className=" block mb-2 mt-1"
				>
					Őshonos
				</label>
				<Dropdown
					value={oshonos}
					onChange={(e) => setOshonos(e.value)}
					options={oshonosOptions}
					htmlFor="oshonos"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* orokbefogado dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="orokbefogado"
					className=" block mb-2 mt-1"
				>
					Örökbefogadott
				</label>
				<Dropdown
					value={orokbefogado}
					onChange={(e) => setOrokbefogado(e.value)}
					options={[...new Set(orokbefogadoOptions)]}
					htmlFor="orokbefogado"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
			{/* kivagas dropdown */}
			<div className=" flex justify-content-center flex-column">
				<label
					htmlFor="kivagas"
					className=" block mb-2 mt-1"
				>
					Kivágandó
				</label>
				<Dropdown
					value={kivagas}
					onChange={(e) => setKivagas(e.value)}
					options={[...new Set(kivagasOptions)]}
					htmlFor="kivagas"
					showClear
					placeholder="Válassz"
					className="w-full md:w-14rem"
				/>
			</div>
		</aside>
	);
};

function App() {
	/* For filtering */
	const [trees, setTrees] = useState([]);
	/* For basic datas that are not modified */
	const [datas, setDatas] = useState([]);

	/* Mobile sidebar */
	// const [visible, setVisible] = useState(false);
	// const screenSize = window.screen.width <= 800;

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
				zoom={18}
				maxZoom={23}
				minZoom={17}
				
					
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
