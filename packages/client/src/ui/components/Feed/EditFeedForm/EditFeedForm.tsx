import { Box, Paper, Text, Title } from '@mantine/core'
import { useFocusTrap } from '@mantine/hooks'

import type { Tab } from '@newsdash/common/schema'

import selectSettings from '#store/slices/settings/selectors'
import Divider from '#ui/components/common/Divider/Divider'
import Scroller from '#ui/components/common/Scroller/Scroller'
import FeedIcon from '#ui/components/Feed/FeedIcon/FeedIcon'
import { useSelector } from '#ui/hooks/store'
import { getTitle } from '#utils'
import type { TabEditMode } from '#types/layout'

import ButtonGroup from './ButtonGroup'
import ColorInput from './inputs/ColorInput'
import DisplayInput from './inputs/DisplayInput'
import FiltersInput from './inputs/FiltersInput'
import TitleInput from './inputs/TitleInput'
import UrlInput from './inputs/UrlInput'
import useEditForm from './useEditForm'

import classes from './EditFeedForm.module.css'

function EditFeedForm({ feedItemCount, mode, tab }: EditFeedFormProps) {
  const { form, onCancel, onDelete, onSubmit } = useEditForm(mode, tab)
  const { tabColors } = useSelector(selectSettings)
  const focusTrapRef = useFocusTrap()

  return (
    <Box className={classes.center}>
      <Paper className={classes.paper}>
        <div className={classes.scrollWrapper}>
          <Scroller>
            <div className={classes.content}>
              <Title className={classes.title} order={3}>
                <FeedIcon className={classes.feedIcon} tab={tab} />
                <Text component="span" fz="xl" truncate>
                  {mode === 'new' ? 'Add Feed' : getTitle(tab, feedItemCount)}
                </Text>
              </Title>
              <form className={classes.form} onSubmit={onSubmit} ref={focusTrapRef}>
                <Divider label="General" />
                <UrlInput form={form} />
                <TitleInput
                  disabled={form.getValues().customTitle === ''}
                  form={form}
                  placeholder={tab.title}
                />
                <Divider label="Display" />
                <DisplayInput form={form} />
                {tabColors && (
                  <>
                    <Divider label="Color" />
                    <ColorInput form={form} />
                  </>
                )}
                <Divider label="Filters" />
                <FiltersInput form={form} />
                <Divider />
                <ButtonGroup mode={mode} onCancel={onCancel} onDelete={onDelete} />
              </form>
            </div>
          </Scroller>
        </div>
      </Paper>
    </Box>
  )
}

interface EditFeedFormProps {
  feedItemCount: number
  mode: TabEditMode
  tab: Tab
}

export default EditFeedForm
