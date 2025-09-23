import React, { useState, useEffect } from 'react'
import { cn } from '../../../utils/cn'
import { getDefaultCategoryColor } from '../../../utils/timelineUtils'
import type { PartyEvent } from '../../../types/timeline'
import { Modal } from '../../atoms/Modal'
import { Button } from '../../atoms/Button'
import { Input } from '../../atoms/Input'
import { TextArea } from '../../atoms/TextArea'
import { Select } from '../../atoms/Select'

export interface EventCreationModalProps {
  isOpen: boolean
  onClose: () => void
  onEventCreate: (event: Omit<PartyEvent, 'id'>) => void
  suggestedTime: string
  className?: string
}

export const EventCreationModal: React.FC<EventCreationModalProps> = ({
  isOpen,
  onClose,
  onEventCreate,
  suggestedTime,
  className = ''
}) => {
  const [formData, setFormData] = useState<Omit<PartyEvent, 'id'>>({
    title: '',
    description: '',
    startTime: suggestedTime,
    endTime: '',
    eventType: 'duration',
    category: 'activity',
    priority: 'medium',
    assignedTasks: [],
    relatedElements: [],
    color: '',
    assignedTo: [],
    location: '',
    attendees: undefined,
    notes: ''
  })

  // Update start time when suggested time changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      startTime: suggestedTime
    }))
  }, [suggestedTime])

  // Update color when category changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      color: getDefaultCategoryColor(prev.category)
    }))
  }, [formData.category])

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleArrayInputChange = (field: 'assignedTasks' | 'relatedElements' | 'assignedTo', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(Boolean)
    setFormData(prev => ({
      ...prev,
      [field]: items
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.title.trim()) {
      alert('Please enter an event title')
      return
    }
    
    if (!formData.startTime) {
      alert('Please enter a start time')
      return
    }
    
    if (formData.eventType === 'duration' && !formData.endTime) {
      alert('Please enter an end time for duration events')
      return
    }
    
    // For milestone events, clear end time
    const eventData = {
      ...formData,
      endTime: formData.eventType === 'milestone' ? undefined : formData.endTime,
      title: formData.title.trim(),
      description: formData.description?.trim() || undefined,
      location: formData.location?.trim() || undefined,
      notes: formData.notes?.trim() || undefined,
      attendees: formData.attendees || undefined
    }
    
    onEventCreate(eventData)
    onClose()
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      startTime: suggestedTime,
      endTime: '',
      eventType: 'duration',
      category: 'activity',
      priority: 'medium',
      assignedTasks: [],
      relatedElements: [],
      color: '',
      assignedTo: [],
      location: '',
      attendees: undefined,
      notes: ''
    })
  }

  const handleClose = () => {
    onClose()
    // Reset form on close
    setFormData({
      title: '',
      description: '',
      startTime: suggestedTime,
      endTime: '',
      eventType: 'duration',
      category: 'activity',
      priority: 'medium',
      assignedTasks: [],
      relatedElements: [],
      color: '',
      assignedTo: [],
      location: '',
      attendees: undefined,
      notes: ''
    })
  }

  const categoryOptions = [
    { value: 'setup', label: 'Setup' },
    { value: 'activity', label: 'Activity' },
    { value: 'meal', label: 'Meal' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'cleanup', label: 'Cleanup' },
    { value: 'other', label: 'Other' }
  ]

  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'critical', label: 'Critical' }
  ]

  const eventTypeOptions = [
    { value: 'duration', label: 'Duration Event' },
    { value: 'milestone', label: 'Milestone Event' }
  ]

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className={cn('max-w-lg', className)}
    >
      <form onSubmit={handleSubmit} className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          Create New Event
        </h2>

        <div className="space-y-4">
          {/* Title */}
          <Input
            label="Event Title *"
            placeholder="Enter event title..."
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            required
          />

          {/* Description */}
          <TextArea
            label="Description"
            placeholder="Enter event description..."
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={3}
          />

          {/* Event Type */}
          <Select
            label="Event Type *"
            options={eventTypeOptions}
            value={formData.eventType}
            onChange={(e) => handleInputChange('eventType', e.target.value)}
            required
          />

          {/* Time inputs */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Time *"
              type="time"
              value={formData.startTime}
              onChange={(e) => handleInputChange('startTime', e.target.value)}
              required
            />
            
            {formData.eventType === 'duration' && (
              <Input
                label="End Time *"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange('endTime', e.target.value)}
                required
              />
            )}
          </div>

          {/* Category and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category *"
              options={categoryOptions}
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              required
            />

            <Select
              label="Priority *"
              options={priorityOptions}
              value={formData.priority}
              onChange={(e) => handleInputChange('priority', e.target.value)}
              required
            />
          </div>

          {/* Location */}
          <Input
            label="Location"
            placeholder="Enter event location..."
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
          />

          {/* Assigned To */}
          <Input
            label="Assigned To"
            placeholder="Enter names separated by commas..."
            value={formData.assignedTo?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('assignedTo', e.target.value)}
            helperText="Separate multiple names with commas"
          />

          {/* Attendees */}
          <Input
            label="Expected Attendees"
            type="number"
            placeholder="Number of attendees..."
            value={formData.attendees || ''}
            onChange={(e) => handleInputChange('attendees', e.target.value ? parseInt(e.target.value) : undefined)}
            min={0}
          />

          {/* Tasks */}
          <Input
            label="Assigned Tasks"
            placeholder="Enter tasks separated by commas..."
            value={formData.assignedTasks?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('assignedTasks', e.target.value)}
            helperText="Separate multiple tasks with commas"
          />

          {/* Related Elements */}
          <Input
            label="Related Elements"
            placeholder="Enter elements separated by commas..."
            value={formData.relatedElements?.join(', ') || ''}
            onChange={(e) => handleArrayInputChange('relatedElements', e.target.value)}
            helperText="Separate multiple elements with commas"
          />

          {/* Notes */}
          <TextArea
            label="Notes"
            placeholder="Additional notes..."
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            rows={2}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1"
          >
            Create Event
          </Button>
        </div>
      </form>
    </Modal>
  )
}

EventCreationModal.displayName = 'EventCreationModal'