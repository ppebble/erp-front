import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { AddEquipParam } from '../pages/topic/equipment/modal/CustomEquipAddModal';

type EquipInfo = {
	assetCode: string;
	createDate: string;
	equipmentNo: number;
	equipmentName: string;
	modifyDate: string;
	note: string;
	place: string;
	price: string;
	status: string;
	user: string;
};
type equipList = {
	notebook: EquipInfo[];
	desktop: EquipInfo[];
	server: EquipInfo[];
	mobile: EquipInfo[];
	book: EquipInfo[];
	etc: EquipInfo[];
	monitor: EquipInfo[];
};
type ActionItem = {
	setEquipList: (equip: equipList) => void | null;
	setEquip: (equip: AddEquipParam) => void | null;
	setEquipClear: () => void | null;
};

export interface EquipStore {
	allEquipList: equipList;
	equip: AddEquipParam;
	action: ActionItem;
}

const useEquip = create<EquipStore>()(
	devtools((set) => ({
		allEquipList: {} as equipList,
		equip: {} as AddEquipParam,
		action: {
			setEquipList: (equip: equipList) =>
				set(
					{
						allEquipList: equip,
					},
					false,
					'EQUIP_LIST',
				),
			setEquip: (equip: AddEquipParam) =>
				set(
					{
						equip,
					},
					false,
					'EQUIP_DETAIL',
				),
			setEquipClear: () =>
				set(
					{
						equip: {} as AddEquipParam,
					},
					false,
					'CLEAR_EQUIP_DETAIL',
				),
		},
	})),
);
export const useEquipDetail = () => useEquip((state) => state.equip);
export const useEquipList = () => useEquip((state) => state.allEquipList);
export const useEquipAction = () => useEquip((state) => state.action);
export default useEquip;
