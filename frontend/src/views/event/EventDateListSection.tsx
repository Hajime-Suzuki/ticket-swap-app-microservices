import ErrorMessage from 'components/messages/ErrorMessage'
import { GetEventAndTicketsQuery } from 'graphql/generated/events'
import React, { FC } from 'react'
import { List, ListItem, ListItemText } from '@material-ui/core'
import { getDate } from 'helpers/date'

interface Props {
  event: NonNullable<GetEventAndTicketsQuery['getEvent']>['event']
}

const EventDateListSection: FC<Props> = props => {
  const { event } = props
  if (!event) return <ErrorMessage text="No Data Found" />
  const { dates } = event
  return (
    <List>
      {dates.map((d, i) => {
        return (
          <ListItem key={i}>
            <ListItemText>{getDate(d.date)}</ListItemText>
          </ListItem>
        )
      })}
    </List>
  )
}

export default EventDateListSection
