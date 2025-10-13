// DO NOT UNCOMMENT
// import './styles/base.css'

// Shared Types
export { SuggestionStatus } from './types/shared'
export type {
	SuggestionStatusType,
	MaterialStatusAction,
	EventMode,
	EventData,
	ConnectedElement,
} from './types/shared'

// Atoms
export { Button } from './components/atoms/Button'
export type { ButtonProps } from './components/atoms/Button'

export { Input } from './components/atoms/Input'
export type { InputProps } from './components/atoms/Input'

export { Badge } from './components/atoms/Badge'
export type { BadgeProps } from './components/atoms/Badge'

export { Logo } from './components/atoms/Logo'
export type { LogoProps } from './components/atoms/Logo'
export { Icon } from './components/atoms/Icon'
export type { IconProps } from './components/atoms/Icon'

export { StatusBadge } from './components/atoms/StatusBadge'
export type { StatusBadgeProps } from './components/atoms/StatusBadge'

export { FeatureList } from './components/atoms/FeatureList'
export type { FeatureListProps } from './components/atoms/FeatureList'

export { TextInput } from './components/atoms/TextInput'
export type { TextInputProps } from './components/atoms/TextInput'

export { EmailInput } from './components/atoms/EmailInput'
export type { EmailInputProps } from './components/atoms/EmailInput'

export { PasswordInput } from './components/atoms/PasswordInput'
export type { PasswordInputProps } from './components/atoms/PasswordInput'

export { NumberInput } from './components/atoms/NumberInput'
export type { NumberInputProps } from './components/atoms/NumberInput'

export { SearchInput } from './components/atoms/SearchInput'
export type { SearchInputProps } from './components/atoms/SearchInput'

export { TextArea } from './components/atoms/TextArea'
export type { TextAreaProps } from './components/atoms/TextArea'

export { Select } from './components/atoms/Select'
export type { SelectProps, SelectOption } from './components/atoms/Select'

export { Checkbox } from './components/atoms/Checkbox'
export type { CheckboxProps } from './components/atoms/Checkbox'

export { RadioButton } from './components/atoms/RadioButton'
export type { RadioButtonProps, RadioOption } from './components/atoms/RadioButton'

export { DatePicker } from './components/atoms/DatePicker'
export type { DatePickerProps } from './components/atoms/DatePicker'

export { ProgressBar } from './components/atoms/ProgressBar'
export type { ProgressBarProps } from './components/atoms/ProgressBar'

export { Modal } from './components/atoms/Modal'
export type { ModalProps } from './components/atoms/Modal'

export { Drawer } from './components/atoms/Drawer'
export type { DrawerProps } from './components/atoms/Drawer'

export { EditableField } from './components/atoms/EditableField/EditableField'
export type { EditableFieldProps } from './components/atoms/EditableField/EditableField'

export { DetailsGrid } from './components/atoms/DetailsGrid/DetailsGrid'
export type { DetailsGridProps } from './components/atoms/DetailsGrid/DetailsGrid'

// Organisms - EditableField (New versions)
export {
	EditableField as EditableFieldOrganism,
	EditableTextField,
	EditableTextArea,
} from './components/organisms/EditableField'
export type {
	EditableFieldProps as EditableFieldOrganismProps,
	EditableTextFieldProps,
	EditableTextAreaProps,
} from './components/organisms/EditableField'

// Organisms - Drawer Components
export { DrawerHeader } from './components/organisms/DrawerHeader'
export type { DrawerHeaderProps } from './components/organisms/DrawerHeader'

export { DrawerFooter } from './components/organisms/DrawerFooter'
export type { DrawerFooterProps } from './components/organisms/DrawerFooter'

// Organisms - Connected Sections
export { ConnectedItemsSection } from './components/organisms/ConnectedItemsSection'
export type {
	ConnectedItemsSectionProps,
	ConnectedItem,
} from './components/organisms/ConnectedItemsSection'

// Molecules - Drawer Connected Sections
export {
	ConnectedElementsSection,
	ConnectedTasksSection,
	ConnectedMaterialsSection,
	ConnectedEventsSection,
} from './components/molecules/DrawerConnectedSections'
export type {
	ConnectedElementsSectionProps,
	ConnectedTasksSectionProps,
	ConnectedMaterialsSectionProps,
	ConnectedEventsSectionProps,
} from './components/molecules/DrawerConnectedSections'

// Molecules - StatusDropdown
export { StatusDropdown } from './components/molecules/StatusDropdown'
export type { StatusDropdownProps } from './components/molecules/StatusDropdown'

// Molecules
export { Card, CardHeader, CardContent, CardFooter } from './components/molecules/Card'
export type {
	CardProps,
	CardHeaderProps,
	CardContentProps,
	CardFooterProps,
} from './components/molecules/Card'

export { ProgressStep } from './components/molecules/ProgressStep'
export type { ProgressStepProps } from './components/molecules/ProgressStep'

// Molecules - ProgressStepper
export { ProgressStepper } from './components/molecules/ProgressStepper'
export type {
	ProgressStepperProps,
	ProgressStepperStep,
} from './components/molecules/ProgressStepper'

// Molecules - Dropdown
export {
	Dropdown,
	DropdownTrigger,
	DropdownContent,
	DropdownItem,
	DropdownDivider,
} from './components/molecules/Dropdown'
export type {
	DropdownProps,
	DropdownTriggerProps,
	DropdownContentProps,
	DropdownItemProps,
	DropdownDividerProps,
} from './components/molecules/Dropdown'

// Organisms
export {
	Navbar,
	NavbarLeft,
	NavbarRight,
	NavbarLink,
	NavbarAccountDropdown,
	NavbarDropdownItem,
	NavbarDropdownDivider,
} from './components/organisms/Navbar'
export type {
	NavbarProps,
	NavbarLeftProps,
	NavbarRightProps,
	NavbarLinkProps,
	NavbarAccountDropdownProps,
	NavbarDropdownItemProps,
	NavbarDropdownDividerProps,
} from './components/organisms/Navbar'

// Organisms - PartyDetailsForm
export { PartyDetailsForm } from './components/organisms/PartyDetailsForm'
export type { PartyDetailsFormProps, PartyDetails } from './components/organisms/PartyDetailsForm'

// Organisms - EventDetailsDrawer
export { EventDetailsDrawer } from './components/organisms/EventDetailsDrawer'
export type { EventDetailsDrawerProps } from './components/organisms/EventDetailsDrawer'

// Molecules - QuickAddEventSheet
export { QuickAddEventSheet } from './components/molecules/QuickAddEventSheet'
export type { QuickAddEventSheetProps } from './components/molecules/QuickAddEventSheet'

export { PartyCard } from './components/molecules/PartyCard'
export type { PartyCardProps } from './components/molecules/PartyCard'

// Organisms
export { PartySelector } from './components/organisms/PartySelector'
export type { PartySelectorProps, PartyOption } from './components/organisms/PartySelector'

export { PartySelectionLayout } from './components/organisms/PartySelectionLayout'
export type { PartySelectionLayoutProps } from './components/organisms/PartySelectionLayout'

export { ProgressTracker } from './components/organisms/ProgressTracker'
export type {
	ProgressTrackerProps,
	ProgressStepData,
	ProgressCategory,
} from './components/organisms/ProgressTracker'

// Organisms - EventTimeline
export { EventTimeline } from './components/organisms/EventTimeline'
export type { EventTimelineProps, TimeFilter } from './components/organisms/EventTimeline'

// Molecules - TimelineItem
export { TimelineItem } from './components/molecules/TimelineItem'
export type { TimelineItemProps, TimelineEvent } from './components/molecules/TimelineItem'

// Molecules - TimelineAxis
export { TimelineAxis } from './components/molecules/TimelineAxis'
export type { TimelineAxisProps } from './components/molecules/TimelineAxis'

// Molecules - EventBlock
export { EventBlock, EventBlockTimeline } from './components/molecules/EventBlock'
export type {
	EventBlockProps,
	EventBlockTimelineProps,
	TimelineEvent as EventBlockTimelineEvent,
} from './components/molecules/EventBlock'

// Organisms - ThemeSelectionHeader
export { ThemeSelectionHeader } from './components/organisms/ThemeSelectionHeader'
export type { ThemeSelectionHeaderProps } from './components/organisms/ThemeSelectionHeader'

// Molecules - ElementCard
export {
	ElementCard,
	ActionButtons,
	CategoryBadge,
	ElementContent,
	ElementImage,
} from './components/molecules/ElementCard'
export type { ElementCardProps, Element, Layout, Mode } from './components/molecules/ElementCard'

// Molecules - SuggestionElementCard
export { SuggestionElementCard } from './components/molecules/SuggestionElementCard'
export type { SuggestionData } from './components/molecules/SuggestionElementCard'

// Molecules - MaterialCard
export { MaterialCard, MaterialActions, MaterialStatus } from './components/molecules/MaterialCard'
export type {
	MaterialCardProps,
	Material,
	MaterialStatus as MaterialStatusType,
} from './components/molecules/MaterialCard'

// Molecules - MaterialGroup
export { MaterialGroup, MaterialGroupHeader } from './components/molecules/MaterialGroup'
export type {
	MaterialGroupProps,
	PartyElement,
	GroupMaterial,
} from './components/molecules/MaterialGroup'

// Demo
export { Demo } from './components/Demo'

// Utilities
export { cn } from './utils/cn'
