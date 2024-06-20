import { Box, Divider, Paper, Title } from '@mantine/core'

import selectSettings from '#store/slices/settings/selectors'
import FeedIcon from '#ui/components/Feed/FeedIcon/FeedIcon'
import { useSelector } from '#ui/hooks/store'

import ButtonGroup from './ButtonGroup'
import ColorInput from './inputs/ColorInput'
import DisplayInput from './inputs/DisplayInput'
import TitleInput from './inputs/TitleInput'
import UrlInput from './inputs/UrlInput'
import useEditForm from './useEditForm'
import type { EditFeedFormProps } from './types'

import classes from './EditFeedForm.module.css'

function EditFeedForm({ mode, tab }: EditFeedFormProps) {
  const { form, onCancel, onDelete, onSubmit } = useEditForm(mode, tab)
  const { tabColors } = useSelector(selectSettings)

  return (
    <Box className={classes.formWrapper}>
      <Paper className={classes.content} radius="md">
        <Title className={classes.title} order={2}>
          <FeedIcon className={classes.feedIcon} tab={tab} />
          {mode === 'new' ? 'Add Feed' : 'Feed Settings'}
        </Title>
        <form className={classes.form} onSubmit={onSubmit}>
          <UrlInput form={form} />
          <TitleInput
            disabled={form.getValues().customTitle === ''}
            form={form}
            placeholder={tab.title}
          />
          <DisplayInput form={form} />
          <ColorInput disabled={!tabColors} form={form} />
          <Divider />
          <ButtonGroup mode={mode} onCancel={onCancel} onDelete={onDelete} />
        </form>
      </Paper>
    </Box>
  )
}

export default EditFeedForm
